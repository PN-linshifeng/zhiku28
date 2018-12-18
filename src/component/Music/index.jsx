import React from 'react';

class Music extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      allTime: '00:00',
      moveTime: '00:00',
      moveSlider: 0,
      volume: 50,
      audio: null,
      sliderWidth: 400 - 12,
      mouserEnter: false,
      btnPlay: 'play',
    };
  }
  componentDidMount() {
    document.querySelector("body").style.marginBottom = "80PX";
    const { sliderWidth, audio } = this.state;
    var startX, endX, left, styleLeft = false;
    var isTouch = 'ontouchstart' in document.createElement('div');
    var tstart = isTouch ? 'touchstart' : 'mousedown';
    var tmove = isTouch ? 'touchmove' : 'mousemove';
    var tend = isTouch ? 'touchend' : 'mouseup';
    let than = this
    //时间线
    this.controlsSlider.addEventListener(
      tstart,
      function(e) {
        e.preventDefault();
        startX = e.touches ? e.touches[0].clientX : e.clientX;
        left = parseInt(window.getComputedStyle(this.controlsSlider, null).left);
        than.setState({
          mouserEnter: true,
        })

        //move
        document.addEventListener(tmove, move, false);
        document.addEventListener(tend, up, false);
      }.bind(this),
      false
    );

    function move() {
      const { mouserEnter } = than.state;
      if (!mouserEnter) return;

      event.preventDefault();
      endX = event.touches ? event.touches[0].clientX : event.clientX;
      styleLeft = left + endX - startX;
      styleLeft = Math.ceil(
        styleLeft <= 0 ? 0 : styleLeft >= sliderWidth ? sliderWidth : styleLeft
      );
      than.setState({
        moveSlider: styleLeft
      })
    }

    function up() {
      const { audio, sliderWidth } = than.state;
      than.setState({
        mouserEnter: false,
      })
      document.removeEventListener(tmove, move, false);
      document.removeEventListener(tend, up, false);
      //设置播放时间段currentTime
      var currentTime = Math.floor((audio.duration * styleLeft) / sliderWidth);
      audio.currentTime = currentTime;
    }

    // 声音线
    this.volumeControlsSlider.addEventListener(
      tstart,
      function(e) {
        e.preventDefault();
        startX = e.touches ? e.touches[0].clientX : e.clientX;
        left = parseInt(window.getComputedStyle(this.volumeControlsSlider, null).left);
        than.setState({
          mouserEnter: true,
        })

        //move
        document.addEventListener(tmove, moveV, false);
        document.addEventListener(tend, upV, false);
      }.bind(this),
      false
    );

    function moveV() {
      const { mouserEnter } = than.state;
      if (!mouserEnter) return;
      event.preventDefault();
      endX = event.clientX;
      styleLeft = left + endX - startX;
      styleLeft = Math.ceil(styleLeft <= 0 ? 0 : styleLeft >= 50 ? 50 : styleLeft);
      const o = styleLeft * 100 / 50
      than.setState({
        volume: o
      })
    }

    function upV() {
      than.setState({
        mouserEnter: false,
      })
      document.removeEventListener(tmove, moveV, false);
      document.removeEventListener(tend, upV, false);
      //设置播放时间段currentTime
      var currentTime = Math.ceil(styleLeft <= 0 ? 0 : styleLeft >= 50 ? 50 : styleLeft);
      audio.volume = currentTime / 100;
    }
    this.setState({
      audio: new Audio(),
    })



  }
  componentDidUpdate(prevProps) {
    const { current } = this.props;
    const { audio } = this.state;
    if (current !== prevProps.current || audio.src == '') {
      this.reSet()
    }
  }
  componentWillUnmount() {
    const { audio } = this.state;
    this.stop();
    audio.scr = null;
    clearInterval(this.interval);
    document.querySelector("body").style.marginBottom = "0PX";
  }

  reSet = () => {
    const { audio } = this.state;
    const { dataList, current } = this.props;
    const than = this;
    if (audio) {
      //播放结束
      audio.addEventListener("ended", function() {
        // console.log("ended")
        than.end();
      }, false);

      //监听可以播放
      audio.addEventListener("playing", function() {
        // console.log("playing");
        than.playing();
      }, false);

      //播放error
      audio.addEventListener("error", function() {
        // console.log("error");
        than.error();
      }, false);

      //缓冲waiting
      audio.addEventListener("waiting", function() {
        console.log("waiting")
        than.waiting();
      }, false);
    }
    audio.src = dataList[current].src;
    this.play();
  }

  //切换播放或者暂停
  switch = () => {
    const { audio } = this.state;

    if (audio.paused) {
      this.play()
    } else {
      this.stop()
    }
  }

  //播放
  play = () => {
    const { audio } = this.state;
    this.upControls();
    clearInterval(this.interval);
    audio.play();
  };
  //音乐加载error
  error = () => {
    const { onSetBtnPlay } = this.props;
    onSetBtnPlay('btn-none', 'error');
  };

  //正在播放中
  playing = () => {
    const than = this;
    const { onSetBtnPlay } = this.props;
    onSetBtnPlay('btn-pause', 'play');
    this.times();
    this.setState({
      btnPlay: 'stop',
    })

    this.interval = setInterval(function() {
      than.times();
    }, 1000);
  }

  //音频正在加载缓存当中....
  waiting = () => {
    const { onSetBtnPlay } = this.props;
    onSetBtnPlay('btn-waiting', 'waiting');
    this.setState({
      btnPlay: 'waiting',
    })
  }

  //切换音频更新控件的显示
  upControls = () => {
    this.setState({
      allTime: '00:00',
      moveTime: '00:00',
      moveSlider: 0,
      btnPlay: 'play',
    })

  };

  //暂停播放
  stop = () => {
    // console.log("stop")
    const { onSetBtnPlay } = this.props;
    const { audio } = this.state;
    onSetBtnPlay('btn-play', 'paused');
    audio.pause();
    this.setState({
      btnPlay: 'play',
    })
    clearInterval(this.interval);
  };
  //播放结束
  end = () => {
    clearInterval(this.interval);
    const { audio } = this.state;
    const { onSetBtnPlay } = this.props;
    onSetBtnPlay('btn-play', 'paused');

    this.setState({
      moveTime: '00:00',
      moveSlider: 0,
      btnPlay: 'play',
    })
    audio.currentTime = 0;
  };
  //设置slider 进度条和时间
  times = () => {
    const { audio, mouserEnter } = this.state;
    var m = parseInt(audio.duration / 60)
    var s = parseInt(audio.duration % 60);
    let allTime = (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);

    allTime = allTime ? allTime : "00:00";
    var m1 = parseInt(audio.currentTime / 60)
    var s1 = parseInt(audio.currentTime % 60);
    var moveTime = (m1 < 10 ? "0" + m1 : m1) + ":" + (s1 < 10 ? "0" + s1 : s1);
    this.setState({
      allTime,
      moveTime
    })
    if (mouserEnter) {
      return;
    }
    const moveSlider = Math.ceil((audio.currentTime * (400 - 12)) / audio.duration)
    this.setState({
      moveSlider,
    })
  };


  render() {
    const { allTime, moveTime, moveSlider, volume, btnPlay, } = this.state;
    const { onPrevNext, current, audioLen } = this.props;
    return (
      <div className="audio-box" style={{ display: 'block' }}>
        <div className="content">
          <div className="times-slider">
            <span className="controls-slider" style={{ left: moveSlider }} ref={(node)=>{this.controlsSlider=node}} />
            <i className="slider-new" style={{ width: moveSlider+2 }} ref={(node)=>{this.sliderNew=node}} />
          </div>
          <div className="time">
            <span className="move-time">{moveTime}</span>/
            <span className="all-time">{allTime}</span>
          </div>
          <div className="panel">
            <span className={`prev ${current===0?'disabled':''}`} onClick={()=>{onPrevNext(-1)}} />
            <span className={btnPlay} onClick={this.switch} />
            <span className={`next ${audioLen-1===current?'disabled':''}`} onClick={()=>{onPrevNext(1)}} />
          </div>
          <div className="volume-box">
            <span className="muted" />
            <div className="volume-slider">
              <span className="controls-volume" style={{ left: volume+'%',marginLeft:-6 }} ref={(node)=>{this.volumeControlsSlider=node}} />
              <i className="volume-slider-new" style={{ width: volume+'%' }} ref={(node)=>{this.volumeSliderNew=node}} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Music;
