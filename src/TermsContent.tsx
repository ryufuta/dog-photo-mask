export function TermsContent() {
  return (
    <div className="modal-scroll -mx-4 max-h-[50vh] overflow-y-auto px-4 text-sm leading-7 md:text-base">
      <p className="mb-5">
        この利用規約（以下「本規約」といいます。）は、Dog Photo
        Mask（以下「本サービス」といいます。）の利用条件を定めるものです。本サービスを利用する方（以下「利用者」といいます。）は、本規約に同意のうえ、本サービスをご利用ください。
      </p>

      <h3 className="mt-7 mb-3 text-lg leading-snug font-semibold">
        第1条（本サービスの内容）
      </h3>
      <ol className="mb-5 list-outside list-decimal space-y-2 pl-6 marker:font-medium">
        <li>
          本サービスは、利用者が選択した画像について、画像内の人物の顔を自動検出し、スタンプを配置・編集することで、画像を加工できる
          Web アプリケーションです。
        </li>
        <li>
          本サービスは無料で提供します。ただし、本サービスの利用に必要な通信料等は、利用者の負担とします。
        </li>
        <li>本サービスの利用にあたり、アカウント登録は必要ありません。</li>
      </ol>

      <h3 className="mt-7 mb-3 text-lg leading-snug font-semibold">
        第2条（画像の取り扱い）
      </h3>
      <ol className="mb-5 list-outside list-decimal space-y-2 pl-6 marker:font-medium">
        <li>
          本サービスでは、利用者が選択した画像の読み込み、顔検出および画像加工を、利用者のブラウザ内で行います。
          <strong>画像データは本サービスのサーバーに送信されません。</strong>
        </li>
        <li>
          利用者は、自身の責任において画像を選択し、加工した画像をコピーまたはダウンロードするものとします。
        </li>
        <li>
          本サービスは、利用者が選択した画像や加工後の画像を保存、管理する機能を提供しません。利用者は、必要に応じて自身で画像を保存してください。
        </li>
      </ol>

      <h3 className="mt-7 mb-3 text-lg leading-snug font-semibold">
        第3条（利用条件および禁止事項）
      </h3>
      <ol className="mb-5 list-outside list-decimal space-y-2 pl-6 marker:font-medium">
        <li>
          利用者は、法令および公序良俗に反しない範囲で本サービスを利用するものとします。
        </li>
        <li>
          利用者は、本サービスの利用にあたり、次の行為を行ってはなりません。
          <ul className="marker:text-muted-foreground mt-2 list-outside list-disc space-y-1 pl-5">
            <li>法令または公序良俗に違反する行為</li>
            <li>
              第三者の著作権、肖像権、プライバシーその他の権利または利益を侵害する行為
            </li>
            <li>本サービスの運営を妨害する行為</li>
            <li>
              本サービスへの不正アクセス、または本サービスのシステムに過度な負荷をかける行為
            </li>
            <li>その他、運営者が不適切と判断する行為</li>
          </ul>
        </li>
      </ol>

      <h3 className="mt-7 mb-3 text-lg leading-snug font-semibold">
        第4条（画像の権利および利用者の責任）
      </h3>
      <ol className="mb-5 list-outside list-decimal space-y-2 pl-6 marker:font-medium">
        <li>
          利用者は、選択する画像について、利用および加工に必要な権利を有していること、または必要な許諾を得ていることを確認するものとします。
        </li>
        <li>
          本サービスを利用して加工した画像を公開、配布その他の方法で利用する場合、利用者は、著作権、肖像権、プライバシーその他の権利に十分配慮するものとします。
        </li>
        <li>
          本サービスは、顔の自動検出やスタンプの配置を補助するものであり、画像内のすべての顔を正確に検出し、確実に隠すことを保証するものではありません。利用者は、加工後の画像を自身で確認したうえで利用するものとします。
        </li>
      </ol>

      <h3 className="mt-7 mb-3 text-lg leading-snug font-semibold">
        第5条（サービスの変更・中断・終了）
      </h3>
      <ol className="mb-5 list-outside list-decimal space-y-2 pl-6 marker:font-medium">
        <li>
          運営者は、必要に応じて、本サービスの内容を変更し、または提供を一時中断することがあります。
        </li>
        <li>
          運営者は、運営上の事情その他の理由により、本サービスの提供を終了することがあります。
        </li>
        <li>
          運営者は、前二項の変更、中断または終了により利用者に生じた損害について、法令上認められる範囲で責任を負わないものとします。
        </li>
      </ol>

      <h3 className="mt-7 mb-3 text-lg leading-snug font-semibold">
        第6条（免責事項）
      </h3>
      <ol className="mb-5 list-outside list-decimal space-y-2 pl-6 marker:font-medium">
        <li>
          運営者は、本サービスについて、正確性、完全性、特定の目的への適合性、継続的な提供および不具合が発生しないことを保証しません。
        </li>
        <li>
          運営者は、本サービスの利用または利用不能により利用者に生じた損害について、運営者の故意または重過失による場合を除き、法令上認められる範囲で責任を負わないものとします。
        </li>
        <li>
          利用者が本サービスを利用して加工した画像を使用または公開したことにより生じたトラブルについては、利用者自身の責任で対応するものとします。ただし、法令上、運営者が責任を負うべき場合はこの限りではありません。
        </li>
      </ol>

      <h3 className="mt-7 mb-3 text-lg leading-snug font-semibold">
        第7条（知的財産権）
      </h3>
      <ol className="mb-5 list-outside list-decimal space-y-2 pl-6 marker:font-medium">
        <li>
          本サービスを構成するプログラム、デザイン、ロゴその他のコンテンツに関する知的財産権は、運営者または正当な権利を有する第三者に帰属します。
        </li>
        <li>
          本サービスの利用によって、利用者に対し、これらの知的財産権が移転するものではありません。
        </li>
        <li>
          利用者が本サービスを通じて加工した画像の権利は、元の画像に関する権利関係および適用される法令等に従うものとします。
        </li>
      </ol>

      <h3 className="mt-7 mb-3 text-lg leading-snug font-semibold">
        第8条（利用規約の変更）
      </h3>
      <p className="mb-5">
        運営者は、必要に応じて本規約を変更することがあります。変更後の利用規約は、本サービス上に掲載した時点から適用されるものとします。ただし、法令上、別途の手続きが必要となる場合は、その手続きに従うものとします。
      </p>

      <h3 className="mt-7 mb-3 text-lg leading-snug font-semibold">
        第9条（準拠法および管轄裁判所）
      </h3>
      <ol className="mb-2 list-outside list-decimal space-y-2 pl-6 marker:font-medium">
        <li>
          本規約は、日本法に準拠し、日本法に従って解釈されるものとします。
        </li>
        <li>
          本サービスに関連して運営者と利用者との間で紛争が生じた場合、法令に別段の定めがある場合を除き、運営者の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
        </li>
      </ol>
    </div>
  );
}
