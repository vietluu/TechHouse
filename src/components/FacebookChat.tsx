'use client';
import { useEffect, useRef } from 'react';

export const FacebookChat = () => {
  const messengerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (messengerRef.current) {
        messengerRef.current.setAttribute('page_id', '109967950338730');
        messengerRef.current.setAttribute('attribution', 'biz_inbox');
        //@ts-ignore
        window.fbAsyncInit = function () {
          //@ts-ignore
          window.FB.init({
            xfbml: true,

            version: 'v17.0',
          });
        };

        (function (d, s, id) {
          var js,
            fjs = d.getElementsByTagName(s)[0];

          if (d.getElementById(id)) return;

          js = d.createElement(s);

          js.id = id;

          (js as any).src =
            'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';

          (fjs as any).parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
      }
    } catch (e) {
      console.log('hihi');
    }
  }, []);

  return (
    <>
      <div id="fb-root" />

      <div
        id="fb-customer-chat"
        className="fb-customerchat"
        ref={messengerRef}
      />
    </>
  );
};
export default FacebookChat;
