import store from 'store';

export default {
  inserted(el) {
    const getWindowMatch = () => window.matchMedia(store.getters.config.windowMatchSizeLg).matches;

    let prevMatchlg = getWindowMatch();

    el.addEventListener('transitionend', () => {
      store.dispatch('isToggleWithoutAnimation', false);
    });

    window.addEventListener('resize', () => {
      if (getWindowMatch() && !prevMatchlg) {
        store.dispatch('toggleSidebar', true);
      } else if (!getWindowMatch() && prevMatchlg) {
        store.dispatch('isToggleWithoutAnimation', true);
        store.dispatch('toggleSidebar', false);
      }
      prevMatchlg = getWindowMatch();
    });
  },
};

