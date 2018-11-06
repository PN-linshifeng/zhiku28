import AppStateClass from './appState';
import NewsStore from './newsStore';
import EXStore from './exStore'
import ChartsStore from './ChartsStore'
// import  from './appState';

export const AppState = AppStateClass;

const AppStatess = (init = {}) => {
  return {
    appState: new AppState(init.appState),
    newsStore: new NewsStore(init.newsStore),
    eXStore: new EXStore(init.eXStore),
    chartsStore: new ChartsStore(init.chartsStore),
  }
}
export default AppStatess
//专给服务器渲染使用
export const createStoreMap = () => {
  return {
    appState: new AppState(),
    newsStore: new NewsStore(),
    eXStore: new EXStore(),
    chartsStore: new ChartsStore(),
  }
}
