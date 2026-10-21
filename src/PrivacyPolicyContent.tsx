export function PrivacyPolicyContent() {
  return (
    <div className="modal-scroll -mx-4 max-h-[50vh] overflow-y-auto px-4 text-sm leading-7 md:text-base">
      <p className="mb-5">
        Dog Photo Mask（以下「本サービス」といいます。）は、
        利用者のプライバシーに配慮し、必要最小限の情報を取り扱います。
      </p>

      <h3 className="mt-7 mb-3 text-lg leading-snug font-semibold">
        第1条（画像の取り扱い）
      </h3>
      <p className="mb-5">
        本サービスでは、利用者が選択した画像の読み込み、顔検出および画像加工を
        利用者のブラウザ内で行います。画像データは本サービスのサーバーに送信されず、
        本サービスによって保存されることもありません。
      </p>

      <h3 className="mt-7 mb-3 text-lg leading-snug font-semibold">
        第2条（アクセス情報の取り扱い）
      </h3>
      <p className="mb-5">
        本サービスでは、稼働状況やページの読み込み性能を把握し、
        安定した運用に役立てるため、Cloudflare Web Analytics を利用しています。
        同サービスを通じて、ページの閲覧状況や読み込み性能などの情報が収集されます。
        Cloudflare Web Analytics は、分析のために Cookie や localStorage
        を使用しません。
      </p>
      <p className="mb-5">
        また、本サービスの提供にあたり、ホスティング基盤である Cloudflare
        において、
        通信の処理やセキュリティの確保などに必要な情報が取り扱われる場合があります。
        詳細は
        <a
          href="https://www.cloudflare.com/privacypolicy/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4"
        >
          Cloudflare プライバシーポリシー
        </a>
        をご確認ください。
      </p>

      <h3 className="mt-7 mb-3 text-lg leading-snug font-semibold">
        第3条（プライバシーポリシーの変更）
      </h3>
      <p className="mb-2">
        本ポリシーは、必要に応じて変更することがあります。
        変更後の内容は、本サービス上に掲載した時点から適用されるものとします。
      </p>
    </div>
  );
}
