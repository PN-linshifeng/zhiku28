import AppStateClass from './appState';
import NewsStore from './newsStore';
import EXStore from './exStore'
import ChartsStore from './ChartsStore'
import DailyExpressState from './dailyExpressState'
import PromoAdStore from './PromoAdStore'
import ForexTradingMicroCoursesState from './forexTradingMicroCoursesState'
import AboutStore from './aboutStore.js'
// import  from './appState';

export const AppState = AppStateClass;

const AppStatess = (init = {}) => {
  return {
    appState: new AppState(init.appState),
    newsStore: new NewsStore(init.newsStore),
    eXStore: new EXStore(init.eXStore),
    chartsStore: new ChartsStore(init.chartsStore),
    dailyExpressState: new DailyExpressState(init.dailyExpressState),
    promoAdStore: new PromoAdStore(init.promoAdStore),
    forexTradingMicroCoursesState: new ForexTradingMicroCoursesState(init.forexTradingMicroCoursesState),
    aboutStore: new AboutStore(init.aboutStore),
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
    dailyExpressState: new DailyExpressState(),
    promoAdStore: new PromoAdStore(),
    forexTradingMicroCoursesState: new ForexTradingMicroCoursesState(),
    aboutStore: new AboutStore(),
  }
}
