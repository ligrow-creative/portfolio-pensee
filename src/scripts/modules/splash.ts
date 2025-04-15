import StateClasses from '~/constants/state-classes';

export default function SetSplash() {
  const { body } = document;
  if (!body) return;

  // ポップアップがopenでなければクラスを付与
  if (!body.classList.contains(StateClasses.Popup.Open)) {
    body.classList.add(StateClasses.Splash.Start);
  }
}
