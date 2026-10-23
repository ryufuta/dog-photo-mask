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
        第2条（アクセス情報およびエラー情報の取り扱い）
      </h3>
      <p className="mb-5">
        本サービスでは、稼働状況やページの読み込み性能を把握し、不具合の調査およびサービスの改善を行うため、
        Cloudflare Web Analytics および Sentry を利用しています。
      </p>
      <p className="mb-5">
        Cloudflare Web Analytics
        を通じて、ページの閲覧状況や読み込み性能などの情報が収集されます。
        また、Sentry を通じて、エラー情報、エラー発生時のブラウザや
        環境に関する情報などが収集されます。
        これらの情報は、サービスの安定した運用および改善のために利用します。
      </p>
      <p className="mb-5">
        各サービスにおける情報の取り扱いについては、以下をご確認ください。
      </p>
      <ul className="marker:text-muted-foreground mb-5 list-outside list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://www.cloudflare.com/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            Cloudflare プライバシーポリシー
          </a>
        </li>
        <li>
          <a
            href="https://sentry.io/privacy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            Sentry プライバシーポリシー
          </a>
        </li>
      </ul>

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
