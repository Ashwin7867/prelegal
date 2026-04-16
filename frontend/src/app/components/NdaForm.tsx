"use client";

import { NdaFormData, PartyInfo } from "../types";

interface NdaFormProps {
  formData: NdaFormData;
  onChange: (data: NdaFormData) => void;
  onSubmit: () => void;
}

function PartyFields({
  label,
  party,
  onChange,
}: {
  label: string;
  party: PartyInfo;
  onChange: (party: PartyInfo) => void;
}) {
  return (
    <fieldset className="border border-slate-300 rounded-lg p-4">
      <legend className="text-sm font-semibold text-slate-700 px-2">
        {label}
      </legend>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={party.name}
            onChange={(e) => onChange({ ...party, name: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Title
          </label>
          <input
            type="text"
            value={party.title}
            onChange={(e) => onChange({ ...party, title: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="CEO"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Company
          </label>
          <input
            type="text"
            value={party.company}
            onChange={(e) => onChange({ ...party, company: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Acme Inc."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Notice Address (email or postal)
          </label>
          <input
            type="text"
            value={party.noticeAddress}
            onChange={(e) =>
              onChange({ ...party, noticeAddress: e.target.value })
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="john@acme.com"
          />
        </div>
      </div>
    </fieldset>
  );
}

export default function NdaForm({ formData, onChange, onSubmit }: NdaFormProps) {
  const update = (partial: Partial<NdaFormData>) =>
    onChange({ ...formData, ...partial });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Purpose
        </label>
        <textarea
          value={formData.purpose}
          onChange={(e) => update({ purpose: e.target.value })}
          rows={2}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="How Confidential Information may be used"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Effective Date
          </label>
          <input
            type="date"
            value={formData.effectiveDate}
            onChange={(e) => update({ effectiveDate: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            MNDA Term
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="mndaTermType"
                checked={formData.mndaTermType === "expires"}
                onChange={() => update({ mndaTermType: "expires" })}
                className="text-blue-600"
              />
              <span>
                Expires after{" "}
                <input
                  type="number"
                  min="1"
                  value={formData.mndaTermYears}
                  onChange={(e) => update({ mndaTermYears: e.target.value })}
                  className="w-16 rounded-md border border-slate-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />{" "}
                year(s) from Effective Date
              </span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="mndaTermType"
                checked={formData.mndaTermType === "untilTerminated"}
                onChange={() => update({ mndaTermType: "untilTerminated" })}
                className="text-blue-600"
              />
              Continues until terminated
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Term of Confidentiality
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="confidentialityTermType"
                checked={formData.confidentialityTermType === "years"}
                onChange={() =>
                  update({ confidentialityTermType: "years" })
                }
                className="text-blue-600"
              />
              <span>
                <input
                  type="number"
                  min="1"
                  value={formData.confidentialityTermYears}
                  onChange={(e) =>
                    update({ confidentialityTermYears: e.target.value })
                  }
                  className="w-16 rounded-md border border-slate-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />{" "}
                year(s) from Effective Date (trade secrets protected longer)
              </span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="confidentialityTermType"
                checked={formData.confidentialityTermType === "perpetuity"}
                onChange={() =>
                  update({ confidentialityTermType: "perpetuity" })
                }
                className="text-blue-600"
              />
              In perpetuity
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Governing Law (State)
          </label>
          <input
            type="text"
            value={formData.governingLaw}
            onChange={(e) => update({ governingLaw: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Delaware"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Jurisdiction
          </label>
          <input
            type="text"
            value={formData.jurisdiction}
            onChange={(e) => update({ jurisdiction: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="courts located in New Castle, DE"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          MNDA Modifications (optional)
        </label>
        <textarea
          value={formData.modifications}
          onChange={(e) => update({ modifications: e.target.value })}
          rows={2}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="List any modifications to the MNDA"
        />
      </div>

      <PartyFields
        label="Party 1"
        party={formData.party1}
        onChange={(party1) => update({ party1 })}
      />

      <PartyFields
        label="Party 2"
        party={formData.party2}
        onChange={(party2) => update({ party2 })}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Preview NDA
      </button>
    </form>
  );
}
