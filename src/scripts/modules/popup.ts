// ========================
// popup
// ========================
import StateClasses from '~/constants/state-classes';
import Events from '~/constants/events';
import Env from '~/constants/env';

export default function SetPopup() {
  // popup要素を取得 と 存在確認
  const popupElm = document.querySelector<HTMLElement>('.js-popup');
  if (!popupElm) return;
  // popup要素の×印を取得 と 存在確認
  const popupCrossElm = popupElm.querySelector<HTMLElement>('.js-popup-cross');
  if (!popupCrossElm) return;
  // クラス付与の対象となる要素の取得 と 存在確認
  const { body } = document;

  // 保存期間の設定(1000ミリ秒 * 60秒 * 1440分(60分 × 24) = 24時間)
  const period = 1000 * 60 * 1440;
  // 保存時に使用するkeyの定義
  const keyPeriod = 'popup-time';
  // 現在時刻を型:numberと型:stringで定義
  const nowAsNumber: number = Date.now();
  const nowAsString: string = nowAsNumber.toString();
  // ローカルストレージに保存されている保存期限のキーを取得
  const savedKeyPeriod = localStorage.getItem(keyPeriod);

  // popupを閉じる処理 ============
  const closePopup = () => {
    body.classList.add(StateClasses.Popup.Close);

    // fadeoutが終了してから、popupElmをnoneに
    setTimeout(() => {
      popupElm.style.display = 'none';
      // kvのスプラッシュのスタート
      body.classList.add(StateClasses.Splash.Start);
    }, 500);

    // bodyのスクロール停止を解除
    body.classList.remove(StateClasses.Popup.Open);
  };

  const initPopup = () => {
    // localStorageに必要な値を保存（前回の値が入っている時も上書き）
    localStorage.setItem(keyPeriod, nowAsString);

    // ポップアップを表示
    popupElm.style.display = 'block';
    body.classList.add(StateClasses.Popup.Open);

    // ポップアップの外側を押されたら
    popupElm.addEventListener(Events.Click, (e) => {
      if ((e.target as HTMLElement).closest('.js-popup-inner') === null) {
        closePopup();
      }
    });
    // closeボタンを押されたら
    popupCrossElm.addEventListener(Events.Click, () => {
      closePopup();
    });
  };

  // 実行 ============
  if (savedKeyPeriod !== null) {
    // 現在時刻と保存期間の差を計算
    const diffPeriod = nowAsNumber - parseFloat(savedKeyPeriod);
    console.log(`表示されてから: ${diffPeriod / 1000}秒`);
    console.log(`保存期間: ${period / (1000 * 60)}分`);
    // 保存期間を経過していたら
    if (diffPeriod > period) {
      initPopup();
    }
    // 初回訪問時（localStorageにセットされていなければ）
  } else {
    initPopup();
  }

  // デバッグ ============
  if (Env.isDev) {
    const bgrBtn = document.querySelector<HTMLButtonElement>('.js-bgr-btn')!;
    bgrBtn.addEventListener(Events.Click, () => {
      console.log(`localStorage: ${keyPeriod} をリセット！`);
      localStorage.removeItem(keyPeriod);
    });
  }
}
