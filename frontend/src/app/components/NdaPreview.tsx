"use client";

import { NdaFormData } from "../types";

interface NdaPreviewProps {
  formData: NdaFormData;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "___________";
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function field(value: string, fallback = "___________"): string {
  return value.trim() || fallback;
}

export default function NdaPreview({ formData }: NdaPreviewProps) {
  const mndaTermText =
    formData.mndaTermType === "expires"
      ? `${formData.mndaTermYears} year(s) from the Effective Date`
      : "Continues until terminated in accordance with the terms of the MNDA";

  const confidentialityTermText =
    formData.confidentialityTermType === "years"
      ? `${formData.confidentialityTermYears} year(s) from the Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws`
      : "In perpetuity";

  return (
    <div id="nda-document" className="bg-white text-black max-w-4xl mx-auto">
      {/* Cover Page */}
      <div className="p-8" style={{ fontFamily: "Georgia, serif" }}>
        <h1 className="text-2xl font-bold text-center mb-2">
          Mutual Non-Disclosure Agreement
        </h1>
        <p className="text-center text-sm text-gray-600 mb-8">
          This Mutual Non-Disclosure Agreement (the &ldquo;MNDA&rdquo;) consists
          of: (1) this Cover Page (&ldquo;Cover Page&rdquo;) and (2) the Common
          Paper Mutual NDA Standard Terms Version 1.0 (&ldquo;Standard
          Terms&rdquo;). Any modifications of the Standard Terms should be made
          on the Cover Page, which will control over conflicts with the Standard
          Terms.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-1">
              Purpose
            </h3>
            <p className="text-sm">{field(formData.purpose)}</p>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-1">
              Effective Date
            </h3>
            <p className="text-sm">{formatDate(formData.effectiveDate)}</p>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-1">
              MNDA Term
            </h3>
            <p className="text-sm">{mndaTermText}</p>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-1">
              Term of Confidentiality
            </h3>
            <p className="text-sm">{confidentialityTermText}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-1">
                Governing Law
              </h3>
              <p className="text-sm">
                State of {field(formData.governingLaw)}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-1">
                Jurisdiction
              </h3>
              <p className="text-sm">{field(formData.jurisdiction)}</p>
            </div>
          </div>

          {formData.modifications.trim() && (
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-1">
                MNDA Modifications
              </h3>
              <p className="text-sm">{formData.modifications}</p>
            </div>
          )}

          <p className="text-sm mt-6">
            By signing this Cover Page, each party agrees to enter into this
            MNDA as of the Effective Date.
          </p>

          {/* Signature Table */}
          <table className="w-full border-collapse text-sm mt-4">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-2 w-1/4"></th>
                <th className="text-center py-2 w-[37.5%] font-bold">
                  Party 1
                </th>
                <th className="text-center py-2 w-[37.5%] font-bold">
                  Party 2
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-medium">Signature</td>
                <td className="py-3 text-center border-b border-gray-400 min-w-[120px]">
                  &nbsp;
                </td>
                <td className="py-3 text-center border-b border-gray-400 min-w-[120px]">
                  &nbsp;
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-medium">Print Name</td>
                <td className="py-3 text-center">
                  {field(formData.party1.name)}
                </td>
                <td className="py-3 text-center">
                  {field(formData.party2.name)}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-medium">Title</td>
                <td className="py-3 text-center">
                  {field(formData.party1.title)}
                </td>
                <td className="py-3 text-center">
                  {field(formData.party2.title)}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-medium">Company</td>
                <td className="py-3 text-center">
                  {field(formData.party1.company)}
                </td>
                <td className="py-3 text-center">
                  {field(formData.party2.company)}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-medium">Notice Address</td>
                <td className="py-3 text-center">
                  {field(formData.party1.noticeAddress)}
                </td>
                <td className="py-3 text-center">
                  {field(formData.party2.noticeAddress)}
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium">Date</td>
                <td className="py-3 text-center">
                  {formatDate(formData.effectiveDate)}
                </td>
                <td className="py-3 text-center">
                  {formatDate(formData.effectiveDate)}
                </td>
              </tr>
            </tbody>
          </table>

          <p className="text-xs text-gray-400 mt-4 text-center">
            Common Paper Mutual Non-Disclosure Agreement (Version 1.0) free to
            use under CC BY 4.0.
          </p>
        </div>
      </div>

      {/* Page Break for PDF */}
      <div style={{ pageBreakBefore: "always" }}></div>

      {/* Standard Terms */}
      <div className="p-8" style={{ fontFamily: "Georgia, serif" }}>
        <h1 className="text-2xl font-bold text-center mb-6">Standard Terms</h1>
        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            <strong>1. Introduction.</strong> This Mutual Non-Disclosure
            Agreement (which incorporates these Standard Terms and the Cover
            Page (defined below)) (&ldquo;MNDA&rdquo;) allows each party
            (&ldquo;Disclosing Party&rdquo;) to disclose or make available
            information in connection with the{" "}
            <em>{field(formData.purpose)}</em> which (1) the Disclosing Party
            identifies to the receiving party (&ldquo;Receiving Party&rdquo;) as
            &ldquo;confidential&rdquo;, &ldquo;proprietary&rdquo;, or the like
            or (2) should be reasonably understood as confidential or proprietary
            due to its nature and the circumstances of its disclosure
            (&ldquo;Confidential Information&rdquo;). Each party&rsquo;s
            Confidential Information also includes the existence and status of
            the parties&rsquo; discussions and information on the Cover Page.
            Confidential Information includes technical or business information,
            product designs or roadmaps, requirements, pricing, security and
            compliance documentation, technology, inventions and know-how. To use
            this MNDA, the parties must complete and sign a cover page
            incorporating these Standard Terms (&ldquo;Cover Page&rdquo;). Each
            party is identified on the Cover Page and capitalized terms have the
            meanings given herein or on the Cover Page.
          </p>

          <p>
            <strong>2. Use and Protection of Confidential Information.</strong>{" "}
            The Receiving Party shall: (a) use Confidential Information solely
            for the <em>{field(formData.purpose)}</em>; (b) not disclose
            Confidential Information to third parties without the Disclosing
            Party&rsquo;s prior written approval, except that the Receiving
            Party may disclose Confidential Information to its employees, agents,
            advisors, contractors and other representatives having a reasonable
            need to know for the <em>{field(formData.purpose)}</em>, provided
            these representatives are bound by confidentiality obligations no
            less protective of the Disclosing Party than the applicable terms in
            this MNDA and the Receiving Party remains responsible for their
            compliance with this MNDA; and (c) protect Confidential Information
            using at least the same protections the Receiving Party uses for its
            own similar information but no less than a reasonable standard of
            care.
          </p>

          <p>
            <strong>3. Exceptions.</strong> The Receiving Party&rsquo;s
            obligations in this MNDA do not apply to information that it can
            demonstrate: (a) is or becomes publicly available through no fault of
            the Receiving Party; (b) it rightfully knew or possessed prior to
            receipt from the Disclosing Party without confidentiality
            restrictions; (c) it rightfully obtained from a third party without
            confidentiality restrictions; or (d) it independently developed
            without using or referencing the Confidential Information.
          </p>

          <p>
            <strong>4. Disclosures Required by Law.</strong> The Receiving Party
            may disclose Confidential Information to the extent required by law,
            regulation or regulatory authority, subpoena or court order, provided
            (to the extent legally permitted) it provides the Disclosing Party
            reasonable advance notice of the required disclosure and reasonably
            cooperates, at the Disclosing Party&rsquo;s expense, with the
            Disclosing Party&rsquo;s efforts to obtain confidential treatment
            for the Confidential Information.
          </p>

          <p>
            <strong>5. Term and Termination.</strong> This MNDA commences on{" "}
            <em>{formatDate(formData.effectiveDate)}</em> and expires at the end
            of the MNDA Term ({mndaTermText}). Either party may terminate this
            MNDA for any or no reason upon written notice to the other party. The
            Receiving Party&rsquo;s obligations relating to Confidential
            Information will survive for the Term of Confidentiality (
            {confidentialityTermText}), despite any expiration or termination of
            this MNDA.
          </p>

          <p>
            <strong>
              6. Return or Destruction of Confidential Information.
            </strong>{" "}
            Upon expiration or termination of this MNDA or upon the Disclosing
            Party&rsquo;s earlier request, the Receiving Party will: (a) cease
            using Confidential Information; (b) promptly after the Disclosing
            Party&rsquo;s written request, destroy all Confidential Information
            in the Receiving Party&rsquo;s possession or control or return it to
            the Disclosing Party; and (c) if requested by the Disclosing Party,
            confirm its compliance with these obligations in writing. As an
            exception to subsection (b), the Receiving Party may retain
            Confidential Information in accordance with its standard backup or
            record retention policies or as required by law, but the terms of
            this MNDA will continue to apply to the retained Confidential
            Information.
          </p>

          <p>
            <strong>7. Proprietary Rights.</strong> The Disclosing Party retains
            all of its intellectual property and other rights in its Confidential
            Information and its disclosure to the Receiving Party grants no
            license under such rights.
          </p>

          <p>
            <strong>8. Disclaimer.</strong> ALL CONFIDENTIAL INFORMATION IS
            PROVIDED &ldquo;AS IS&rdquo;, WITH ALL FAULTS, AND WITHOUT
            WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE,
            MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
          </p>

          <p>
            <strong>9. Governing Law and Jurisdiction.</strong> This MNDA and all
            matters relating hereto are governed by, and construed in accordance
            with, the laws of the State of{" "}
            <em>{field(formData.governingLaw)}</em>, without regard to the
            conflict of laws provisions of such State. Any legal suit, action, or
            proceeding relating to this MNDA must be instituted in the federal or
            state courts located in{" "}
            <em>{field(formData.jurisdiction)}</em>. Each party irrevocably
            submits to the exclusive jurisdiction of such courts.
          </p>

          <p>
            <strong>10. Equitable Relief.</strong> A breach of this MNDA may
            cause irreparable harm for which monetary damages are an insufficient
            remedy. Upon a breach of this MNDA, the Disclosing Party is entitled
            to seek appropriate equitable relief, including an injunction, in
            addition to its other remedies.
          </p>

          <p>
            <strong>11. General.</strong> Neither party has an obligation under
            this MNDA to disclose Confidential Information to the other or
            proceed with any proposed transaction. Neither party may assign this
            MNDA without the prior written consent of the other party, except
            that either party may assign this MNDA in connection with a merger,
            reorganization, acquisition or other transfer of all or substantially
            all its assets or voting securities. Any assignment in violation of
            this Section is null and void. This MNDA will bind and inure to the
            benefit of each party&rsquo;s permitted successors and assigns.
            Waivers must be signed by the waiving party&rsquo;s authorized
            representative and cannot be implied from conduct. If any provision
            of this MNDA is held unenforceable, it will be limited to the
            minimum extent necessary so the rest of this MNDA remains in effect.
            This MNDA (including the Cover Page) constitutes the entire agreement
            of the parties with respect to its subject matter, and supersedes all
            prior and contemporaneous understandings, agreements,
            representations, and warranties, whether written or oral, regarding
            such subject matter. This MNDA may only be amended, modified,
            waived, or supplemented by an agreement in writing signed by both
            parties. Notices, requests and approvals under this MNDA must be sent
            in writing to the email or postal addresses on the Cover Page and are
            deemed delivered on receipt. This MNDA may be executed in
            counterparts, including electronic copies, each of which is deemed an
            original and which together form the same agreement.
          </p>

          <p className="text-xs text-gray-400 mt-6 text-center">
            Common Paper Mutual Non-Disclosure Agreement (Version 1.0) free to
            use under CC BY 4.0.
          </p>
        </div>
      </div>
    </div>
  );
}
