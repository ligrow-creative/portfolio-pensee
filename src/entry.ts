import './styles/style.scss';
import { Init } from '~/index';
import Events from '~/constants/events';

if (document.readyState !== 'loading') {
  Init();
} else {
  document.addEventListener(Events.Load, Init, false);
}
