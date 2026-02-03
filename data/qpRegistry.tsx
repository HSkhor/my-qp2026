import React from 'react';
import { QPData, DistributionItem } from '../types';

const defaultDistribution: DistributionItem[] = [
    { copyNo: "01", location: "My computer > public > folder JABATAN PERUBATAN TRANSFUSI > folder DOCUMENT MS ISO15189." },
    { copyNo: "02", location: "My computer > public > Dokumen HSAH > Dokumen Jabatan Unit > Jabatan Perubatan Transfusi" }
];

// Helper to create empty QPs for placeholders
const createPlaceholderQP = (id: number): QPData => ({
  id: `qp${id}`,
  docNo: `HSAH/JPT/QP${id < 10 ? '0' + id : id}`,
  title: `STANDARD PROCEDURE ${id}`,
  versionNo: "01",
  amendmentNo: "00",
  dateOfIssue: "01/01/2026",
  preparedBy: { name: "TBA", designation: "Scientific Officer", date: "01/01/2026" },
  approvedBy: { name: "TBA", designation: "Head of Department", date: "01/01/2026" },
  procedures: [],
  content: {
      distributionList: defaultDistribution
  }
});

export const qpRegistry: QPData[] = [
  // --- QP05: NON-CONFORMANCE, CORRECTIVE & PREVENTIVE ACTIONS ---
  {
    id: 'qp05',
    docNo: "HSAH/JPT/QP05",
    title: "NON-CONFORMANCE, CORRECTIVE & PREVENTIVE ACTIONS",
    versionNo: "01",
    amendmentNo: "00",
    dateOfIssue: "01/02/2026",
    preparedBy: { name: "TBA", designation: "Quality Manager", date: "01/02/2026" },
    approvedBy: { name: "Dr. Sakinah bt Ahmad", designation: "Head of Department", date: "01/02/2026" },
    content: {
        objectives: "To define and establish a systematic process for the identification, documentation, investigation, and resolution of non-conformances. This procedure ensures that effective Corrective and Preventive Actions (CAPA) are implemented to eliminate root causes, prevent recurrence, and continuously enhance the quality and safety of services within Jabatan Perubatan Transfusi HSAH, in full compliance with MS ISO 15189:2022 standards.",
        scope: "This procedure applies to all actual and potential non-conformances, incidents, near-misses, process deviations, equipment failures, documentation errors, and transfusion-related quality failures occurring across all activities within the department.",
        references: (
            <ul className="space-y-4">
                <li className="flex gap-4">
                    <span className="font-bold min-w-[30px]">3.1</span>
                    <span>MS ISO 15189:2022, Medical laboratories — Requirements for quality and competence, Clause 7.5 (Management of nonconforming work) & 8.7 (Corrective actions).</span>
                </li>
                <li className="flex gap-4">
                    <span className="font-bold min-w-[30px]">3.2</span>
                    <span>HSAH Laboratory Quality Manual.</span>
                </li>
                <li className="flex gap-4">
                    <span className="font-bold min-w-[30px]">3.3</span>
                    <span>HSAH/PAT/PK/16 Risk Management.</span>
                </li>
                <li className="flex gap-4">
                    <span className="font-bold min-w-[30px]">3.4</span>
                    <span>Guidelines on Retention of Pathology Records and Materials (AMM, 2005).</span>
                </li>
            </ul>
        ),
        definitions: (
            <dl className="space-y-4">
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.1 Non-Conformance (NC):</dt>
                    <dd>Non-fulfillment of a specified requirement.</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.2 Corrective Action (CA):</dt>
                    <dd>Action taken to eliminate the cause of a detected non-conformance and prevent its recurrence.</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.3 Preventive Action (PA):</dt>
                    <dd>Action taken to eliminate the cause of a potential non-conformance or other undesirable potential situation.</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.4 JKANC:</dt>
                    <dd>Jawatankuasa Aduan & Non-Conformance.</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.5 RCA:</dt>
                    <dd>Root Cause Analysis.</dd>
                </div>
            </dl>
        ),
        records: [
             { no: "6.1", type: "Non-Conformance Reporting Form", fileNo: "HSAH/JPT/FE05.1", location: "Admin Office", retention: "5 Years" },
             { no: "6.2", type: "Investigation & RCA Reports", fileNo: "-", location: "Admin Office", retention: "5 Years" },
             { no: "6.3", type: "CAPA Plans & Monitoring Logs", fileNo: "-", location: "Admin Office", retention: "5 Years" },
        ],
        amendments: [
            {
                no: "00", version: "01", date: "01/02/2026",
                details: "First Issue."
            }
        ],
        distributionList: defaultDistribution,
        flowchartData: [
            { id: '1', type: 'start' as const, label: 'Identify Non-Conformance' },
            { id: '2', type: 'process' as const, label: 'Document on NC Form (Appendix 1)' },
            { id: '3', type: 'process' as const, label: 'Risk Assessment (HOU)' },
            { id: '4', type: 'process' as const, label: 'Investigation & RCA (IO)' },
            { id: '5', type: 'process' as const, label: 'Develop & Implement CAPA' },
            { id: '6', type: 'decision' as const, label: 'Effective?', secondaryLabel: 'No (Re-Investigate)' },
            { id: '7', type: 'process' as const, label: 'Close Case & Report to Management' },
            { id: '8', type: 'end' as const, label: 'End' },
        ]
    },
    procedures: [
        {
            no: '5.1',
            activity: (
                <>
                <p className="font-bold mb-2">Identification and Reporting of Non-Conformance</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Any staff member who identifies a non-conformance from any source (internal QC, equipment, complaints, audit) must immediately report it.</li>
                    <li>The issue must be documented on the <strong>Non-Conformance Reporting Form (Appendix 1)</strong>.</li>
                    <li>Immediate action must be taken to contain the non-conformance (e.g., halting work, quarantining products).</li>
                </ul>
                </>
            ),
            responsibility: 'All Staff'
        },
        {
            no: '5.2',
            activity: (
                <>
                <p className="font-bold mb-2">Initial Assessment and Risk Classification</p>
                <ul className="list-disc list-inside ml-4">
                    <li>The Head of Unit (HOU) evaluates the severity and potential impact.</li>
                    <li>Classify risk level (High, Medium, Low) to determine urgency.</li>
                    <li>Inform clinicians immediately if patient care is impacted.</li>
                </ul>
                </>
            ),
            responsibility: 'HOU'
        },
        {
            no: '5.3',
            activity: (
                <>
                <p className="font-bold mb-2">Investigation and Root Cause Analysis (RCA)</p>
                <ul className="list-disc list-inside ml-4">
                    <li>HOD appoints an Investigation Officer (IO).</li>
                    <li>IO conducts investigation using tools like <strong>5-Why</strong> or <strong>Fishbone Diagram</strong>.</li>
                    <li>Analyze contributing factors: Personnel, Methods, Equipment, Materials, Environment.</li>
                </ul>
                </>
            ),
            responsibility: 'IO / HOD'
        },
        {
            no: '5.4',
            activity: (
                <>
                <p className="font-bold mb-2">Implementation of CAPA</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Develop comprehensive CAPA plan based on root cause.</li>
                    <li><strong>Corrective Actions:</strong> Rectify immediate problem (e.g., retraining, repair).</li>
                    <li><strong>Preventive Actions:</strong> Eliminate potential causes (e.g., workflow redesign).</li>
                    <li>Document all actions, responsible persons, and deadlines.</li>
                </ul>
                </>
            ),
            responsibility: 'HOU / IO'
        },
        {
            no: '5.5',
            activity: (
                <>
                <p className="font-bold mb-2">Monitoring and Verification of Effectiveness</p>
                <ul className="list-disc list-inside ml-4">
                    <li>HOU monitors implementation.</li>
                    <li>Review effectiveness after defined period:
                        <ul className="list-none ml-4 mt-1">
                            <li>o High Risk: 1 month</li>
                            <li>o Medium Risk: 3 months</li>
                            <li>o Low Risk: 6 months</li>
                        </ul>
                    </li>
                    <li>If ineffective, initiate new RCA. If effective, close case.</li>
                </ul>
                </>
            ),
            responsibility: 'HOU'
        },
        {
            no: '5.6',
            activity: (
                <>
                <p className="font-bold mb-2">Reporting to Management Review</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Submit completed forms and reports to HOD.</li>
                    <li>JKANC analyzes data/trends for Management Review Meeting.</li>
                </ul>
                </>
            ),
            responsibility: 'JKANC / HOD'
        }
    ],
    attachments: [
        {
            id: 'fe05.1',
            docNo: "HSAH/JPT/FE05.1",
            title: "NON-CONFORMANCE REPORTING FORM (APPENDIX 1)",
            content: (
                <div className="w-full font-mono text-sm leading-tight border border-black p-8 bg-white">
                    <div className="text-center font-bold mb-6 border-b-2 border-black pb-4">
                        <p>JABATAN PERUBATAN TRANSFUSI</p>
                        <p>HOSPITAL SULTAN ABDUL HALIM</p>
                        <p className="text-lg mt-2">NON-CONFORMANCE REPORTING (NCR) FORM</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div><strong>NCR No:</strong> ____________________</div>
                        <div><strong>Date:</strong> ____________________</div>
                        <div><strong>Unit/Section:</strong> ____________________</div>
                        <div><strong>Detected By:</strong> ____________________</div>
                    </div>

                    <div className="mb-6 border border-black p-4">
                        <p className="font-bold mb-2">PART A: DESCRIPTION OF NON-CONFORMANCE</p>
                        <p className="italic text-xs mb-2">(Describe what happened, where, and the immediate impact)</p>
                        <div className="h-24 border-b border-dashed border-gray-400"></div>
                        <div className="mt-2">
                            <strong>Immediate Action Taken:</strong>
                            <div className="h-12 border-b border-dashed border-gray-400"></div>
                        </div>
                    </div>

                    <div className="mb-6 border border-black p-4">
                        <p className="font-bold mb-2">PART B: ROOT CAUSE ANALYSIS (RCA)</p>
                        <p className="italic text-xs mb-2">(Use 5-Why or Fishbone. Attach separate sheet if necessary)</p>
                        <div className="h-32 border-b border-dashed border-gray-400"></div>
                        <div className="mt-2 grid grid-cols-2">
                            <div><strong>Investigated By (IO):</strong> _________________</div>
                            <div><strong>Date:</strong> _________________</div>
                        </div>
                    </div>

                    <div className="mb-6 border border-black p-4">
                        <p className="font-bold mb-2">PART C: CORRECTIVE & PREVENTIVE ACTION (CAPA) PLAN</p>
                        <table className="w-full border-collapse border border-black text-xs mt-2">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-black p-2">Action Description</th>
                                    <th className="border border-black p-2 w-24">Type (CA/PA)</th>
                                    <th className="border border-black p-2 w-32">Person In Charge</th>
                                    <th className="border border-black p-2 w-24">Deadline</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="h-12"><td className="border border-black"></td><td className="border border-black"></td><td className="border border-black"></td><td className="border border-black"></td></tr>
                                <tr className="h-12"><td className="border border-black"></td><td className="border border-black"></td><td className="border border-black"></td><td className="border border-black"></td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mb-6 border border-black p-4">
                        <p className="font-bold mb-2">PART D: VERIFICATION OF EFFECTIVENESS</p>
                        <div className="flex gap-4 mb-4">
                            <span>Review Date: ___________</span>
                            <span>Status: [ ] Effective [ ] Not Effective</span>
                        </div>
                        <p><strong>Comments:</strong></p>
                        <div className="h-12 border-b border-dashed border-gray-400 mb-2"></div>
                        <div className="flex justify-between mt-4">
                            <div>
                                <p>Verified By (HOU):</p>
                                <p className="mt-4">______________________</p>
                            </div>
                            <div>
                                <p>Approved By (HOD):</p>
                                <p className="mt-4">______________________</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ]
  },

  // --- QP04: HANDLING OF COMPLAINTS ---
  {
    id: 'qp04',
    docNo: "HSAH/JPT/QP04",
    title: "HANDLING OF COMPLAINTS",
    versionNo: "01",
    amendmentNo: "00",
    dateOfIssue: "01/02/2026",
    preparedBy: { name: "TBA", designation: "Quality Manager", date: "01/02/2026" },
    approvedBy: { name: "Dr. Sakinah bt Ahmad", designation: "Head of Department", date: "01/02/2026" },
    content: {
        objectives: "To establish a standardized procedure for managing, documenting, and resolving complaints received by Jabatan Perubatan Transfusi, ensuring compliance with MS ISO 15189:2022 and improving service quality.",
        scope: "This procedure applies to all complaints related to services provided by Jabatan Perubatan Transfusi, including sample handling, blood transfusion services, communication, workflow efficiency, and staff interactions.",
        references: (
            <ul className="space-y-4">
                <li className="flex gap-4">
                    <span className="font-bold min-w-[30px]">3.1</span>
                    <span>MS ISO 15189:2022 Clause 7.7</span>
                </li>
                <li className="flex gap-4">
                    <span className="font-bold min-w-[30px]">3.2</span>
                    <span>Garis Panduan Pengurusan Maklum Balas Awam KKM Versi 1/2020</span>
                </li>
                <li className="flex gap-4">
                    <span className="font-bold min-w-[30px]">3.3</span>
                    <span>HSAH Laboratory Quality Manual</span>
                </li>
            </ul>
        ),
        definitions: (
            <dl className="space-y-4">
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.1 HOD:</dt>
                    <dd>Head of Department</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.2 HOU:</dt>
                    <dd>Head of Unit</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.3 IO:</dt>
                    <dd>Investigation Officer</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.4 JKANC:</dt>
                    <dd>Jawatankuasa Aduan & Non-Conformance</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.5 SisPAA:</dt>
                    <dd>Sistem Pengurusan Aduan Awam</dd>
                </div>
            </dl>
        ),
        records: [
             { no: "6.1", type: "Complaint Forms / Borang Aduan", fileNo: "HSAH/JPT/FE04.1", location: "Admin Office", retention: "5 Years" },
             { no: "6.2", type: "Investigation Report", fileNo: "Appendix A", location: "Admin Office", retention: "5 Years" },
             { no: "6.3", type: "Feedback Letters", fileNo: "-", location: "Admin Office", retention: "5 Years" },
             { no: "6.4", type: "CAPA Documentation", fileNo: "-", location: "Admin Office", retention: "5 Years" },
        ],
        amendments: [
            {
                no: "00", version: "01", date: "01/02/2026",
                details: "First Issue."
            }
        ],
        distributionList: defaultDistribution,
        flowchartData: [
            { id: '1', type: 'start' as const, label: 'Receive Complaint' },
            { id: '2', type: 'process' as const, label: 'Register & Classify' },
            { id: '3', type: 'process' as const, label: 'Appoint IO' },
            { id: '4', type: 'process' as const, label: 'Investigate' },
            { id: '5', type: 'process' as const, label: 'Determine Root Cause' },
            { id: '6', type: 'process' as const, label: 'Implement CAPA' },
            { id: '7', type: 'process' as const, label: 'Provide Feedback' },
            { id: '8', type: 'end' as const, label: 'Review & Close Case' },
        ]
    },
    procedures: [
        {
            no: '5.1',
            activity: (
                <>
                <p className="font-bold mb-2">Receipt of Complaint</p>
                <p>Complaints may be received through:</p>
                <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Written letters</li>
                    <li>Customer Service Unit notifications</li>
                    <li>Online submissions via SisPAA</li>
                    <li>QR Code Complaint System</li>
                    <li>Verbal complaints (to be documented using Borang Aduan Transfusi)</li>
                </ul>
                </>
            ),
            responsibility: 'All Staff'
        },
        {
            no: '5.2',
            activity: (
                <>
                <p className="font-bold mb-2">Registration and Verification</p>
                <ul className="list-disc list-inside ml-4">
                    <li>All complaints shall be logged in the Complaint Register.</li>
                    <li>HOD assigns a responsible Investigation Officer (IO).</li>
                    <li>Complaints are classified based on severity and nature.</li>
                </ul>
                </>
            ),
            responsibility: 'HOD / Admin'
        },
        {
            no: '5.3',
            activity: (
                <>
                <p className="font-bold mb-2">Investigation</p>
                <ul className="list-disc list-inside ml-4">
                    <li>IO conducts investigation within 4 working days.</li>
                    <li>Collect statements, verify workflow steps, review related documents.</li>
                    <li>Identify root causes using fishbone/RCA approach.</li>
                </ul>
                </>
            ),
            responsibility: 'Investigation Officer (IO)'
        },
        {
            no: '5.4',
            activity: (
                <>
                <p className="font-bold mb-2">Reporting</p>
                <ul className="list-disc list-inside ml-4">
                    <li>IO completes Investigation Report (Appendix A).</li>
                    <li>Submit report to HOU → HOD → JKANC.</li>
                </ul>
                </>
            ),
            responsibility: 'IO'
        },
        {
            no: '5.5',
            activity: (
                <>
                <p className="font-bold mb-2">Corrective and Preventive Actions</p>
                <ul className="list-disc list-inside ml-4">
                    <li>HOU drafts CAPA plan based on findings.</li>
                    <li>Implementation must occur within the stipulated timeframe.</li>
                </ul>
                </>
            ),
            responsibility: 'HOU'
        },
        {
            no: '5.6',
            activity: (
                <>
                <p className="font-bold mb-2">Feedback to Complainant</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Official written feedback issued within 14 days.</li>
                </ul>
                </>
            ),
            responsibility: 'HOD'
        },
        {
            no: '5.7',
            activity: (
                <>
                <p className="font-bold mb-2">Record Keeping</p>
                <ul className="list-disc list-inside ml-4">
                    <li>All records maintained securely for a minimum of 5 years.</li>
                    <li>Access restricted to authorized personnel.</li>
                </ul>
                </>
            ),
            responsibility: 'Admin'
        }
    ]
  },

  // --- WI 14.1: IN-HOUSE VERIFICATION OF MEASURING EQUIPMENTS ---
  {
      id: 'wi14.1',
      docNo: "HSAH/JPT/WI14.1",
      relatedDoc: "HSAH/JPT/QP14",
      title: "IN-HOUSE VERIFICATION OF MEASURING EQUIPMENTS",
      versionNo: "01",
      amendmentNo: "00",
      dateOfIssue: "28/01/2026",
      preparedBy: {
        name: "Khor Hooi Siang",
        designation: "Scientific Officer",
        date: "28 January 2026"
      },
      approvedBy: {
        name: "Dr. Sakinah bt Ahmad",
        designation: "Head of Department",
        date: "28 January 2026"
      },
      content: {
          objectives: "To provide step-by-step instructions for the in-house verification (performance checking) of critical measuring equipment used in Jabatan Perubatan Transfusi to ensure they meet performance specifications.",
          scope: (
            <ul className="list-none space-y-2">
                <li>This instruction applies to:</li>
                <li>2.1 Automatic Pipettes.</li>
                <li>2.2 Thermometers (Working).</li>
                <li>2.3 Weighing Balances.</li>
            </ul>
          ),
          references: (
             <div className="space-y-4">
                 <div className="flex gap-4">
                     <span className="font-bold min-w-[30px]">3.1</span>
                     <span><strong>Scientific Officer (SO):</strong> Monitor schedule and review results.</span>
                 </div>
                 <div className="flex gap-4">
                     <span className="font-bold min-w-[30px]">3.2</span>
                     <span><strong>JTMP / Staff In-Charge:</strong> Perform verification and record data.</span>
                 </div>
             </div>
          ),
          definitions: (
              <div className="space-y-2">
                 <p className="font-bold mb-2">4.0 MATERIALS & EQUIPMENT REQUIRED</p>
                 <ul className="list-none space-y-2">
                     <li>4.1 Distilled Water (for pipette check).</li>
                     <li>4.2 Analytical Balance (Calibrated).</li>
                     <li>4.3 Calibrated Reference Thermometer.</li>
                     <li>4.4 Calculator / Spreadsheet.</li>
                     <li>4.5 Verification Forms (HSAH/JPT/FE14.1 to FE14.3).</li>
                 </ul>
             </div>
          ),
          records: [
              { no: "9.1", type: "Verification of Micropipette", fileNo: "HSAH/JPT/FE14.1", location: "Laboratory", retention: "2 Years" },
              { no: "9.2", type: "Verification of Thermometers", fileNo: "HSAH/JPT/FE14.2", location: "Laboratory", retention: "2 Years" },
              { no: "9.3", type: "Verification of Balance", fileNo: "HSAH/JPT/FE14.3", location: "Laboratory", retention: "2 Years" },
          ],
          amendments: [
            {
                no: "00", version: "01", date: "28/01/2026",
                details: "First Issue for Jabatan Perubatan Transfusi"
            }
          ],
          distributionList: defaultDistribution,
      },
      procedures: [
          // 5.0 PIPETTES
          {
              no: '5.0',
              activity: (
                  <>
                  <p className="font-bold mb-1 underline">INSTRUCTION FOR AUTOMATIC PIPETTES (GRAVIMETRIC METHOD)</p>
                  <ul className="list-disc list-inside mb-2 text-xs text-gray-600">
                      <li><strong>Frequency:</strong> Every 6 Months.</li>
                      <li><strong>Acceptance Criteria:</strong> Accuracy ± 2.0% (or manufacturer spec).</li>
                  </ul>
                  <div className="pl-4">
                      <p className="font-bold text-xs mb-1">Step Action</p>
                      <ol className="list-decimal list-inside space-y-2">
                          <li>Allow distilled water and pipette to reach room temperature.</li>
                          <li>Place a clean beaker on the Analytical Balance and <strong>tare (zero)</strong> the balance.</li>
                          <li>Set pipette to the nominal volume (e.g., 100µL or 1000µL).</li>
                          <li>Aspirate distilled water carefully (avoid bubbles) and dispense into the beaker.</li>
                          <li>Record the weight (in mg).</li>
                          <li>Repeat <strong>10 times</strong>.</li>
                          <li>Calculate the <strong>Mean Weight</strong> and convert to Volume (assuming density of water ≈ 1.0 g/mL at 20-25°C).</li>
                          <li>Calculate <strong>% Accuracy</strong>: <code>(Mean Volume - Target Volume) / Target Volume × 100</code>.</li>
                          <li>If Pass: Label pipette. If Fail: Clean/Service and re-test.</li>
                      </ol>
                  </div>
                  </>
              ),
              responsibility: 'JTMP'
          },
          // 6.0 THERMOMETERS
          {
              no: '6.0',
              activity: (
                  <>
                  <p className="font-bold mb-1 underline">INSTRUCTION FOR THERMOMETERS (COMPARISON METHOD)</p>
                  <ul className="list-disc list-inside mb-2 text-xs text-gray-600">
                      <li><strong>Frequency:</strong> Every 6 Months.</li>
                      <li><strong>Acceptance Criteria:</strong> Difference ≤ ± 1.0°C.</li>
                  </ul>
                  <div className="pl-4">
                      <p className="font-bold text-xs mb-1">Step Action</p>
                      <ol className="list-decimal list-inside space-y-2">
                          <li>Prepare a stable temperature medium appropriate for the thermometer's use:
                              <ul className="list-disc list-inside ml-4">
                                  <li><strong>Ice Bath / Water Bath</strong> for 4°C checks.</li>
                                  <li><strong>Ambient / Heating Block</strong> for Room Temp or 37°C checks.</li>
                              </ul>
                          </li>
                          <li>Place the <strong>Calibrated Reference Probe</strong> and the <strong>Working Thermometer Probe</strong> close together in the medium (without touching sides).</li>
                          <li>Allow temperature to stabilize for at least <strong>10 minutes</strong>.</li>
                          <li>Record readings of both thermometers simultaneously.</li>
                          <li>Calculate the difference: <code>(Working Reading - Reference Reading)</code>.</li>
                          <li>If difference is within limit (±1.0°C), Pass.</li>
                          <li>If difference is outside limit but consistent, apply a <strong>Correction Factor</strong> sticker.</li>
                      </ol>
                  </div>
                  </>
              ),
              responsibility: 'JTMP'
          },
          // 7.0 BALANCES
          {
              no: '7.0',
              activity: (
                  <>
                  <p className="font-bold mb-1 underline">INSTRUCTION FOR WEIGHING BALANCES</p>
                  <ul className="list-disc list-inside mb-2 text-xs text-gray-600">
                      <li><strong>Frequency:</strong> Daily (Zero Check) / Monthly (Standard Weight).</li>
                      <li><strong>Acceptance Criteria:</strong> Within tolerance (e.g., ± 1% or ± 0.1g).</li>
                  </ul>
                  <div className="pl-4">
                      <p className="font-bold text-xs mb-1">Step Action</p>
                      <ol className="list-decimal list-inside space-y-2">
                          <li>Ensure balance is clean, level, and on a stable surface.</li>
                          <li>Press <strong>Tare/Zero</strong>. Ensure display reads <code>0.00</code>.</li>
                          <li>Place a <strong>Standard Known Weight</strong> (e.g., 500g or 1kg) on the pan.</li>
                          <li>Record the displayed weight.</li>
                          <li>If reading drifts significantly, recalibrate (internal cal) or call vendor.</li>
                      </ol>
                  </div>
                  </>
              ),
              responsibility: 'JTMP'
          },
      ],
      attachments: [
        {
            id: 'fe14.1',
            docNo: "HSAH/JPT/FE14.1",
            title: "VERIFICATION OF MICROPIPETTE",
            content: (
                <div className="w-full text-sm font-mono">
                    <div className="border border-black p-4 mb-6">
                      <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                          <div><strong>LOCATION:</strong> ______________________</div>
                          <div><strong>CALIBRATION DUE DATE:</strong> ____________</div>
                          <div><strong>MICROPIPETTE ID:</strong> _______________</div>
                          <div><strong>DENSITY OF WATER:</strong> <span className="underline">0.9982</span></div>
                          <div><strong>MODEL:</strong> __________________________</div>
                          <div><strong>BALANCE NAME:</strong> ____________________</div>
                          <div><strong>DATE PERFORMED:</strong> _________________</div>
                          <div><strong>BALANCE SERIAL NO:</strong> ________________</div>
                      </div>
                    </div>
  
                    <table className="w-full border-collapse border border-black mb-6 text-xs text-center">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-black p-2 bg-white" rowSpan={2}></th>
                                <th className="border border-black p-2" colSpan={2}>Volume 1 (Low)</th>
                                <th className="border border-black p-2" colSpan={2}>Volume 2 (Mid)</th>
                                <th className="border border-black p-2" colSpan={2}>Volume 3 (High)</th>
                            </tr>
                            <tr className="bg-gray-100">
                                <th className="border border-black p-2 w-20">Weight (g)</th>
                                <th className="border border-black p-2 w-20">Vol (µL)</th>
                                <th className="border border-black p-2 w-20">Weight (g)</th>
                                <th className="border border-black p-2 w-20">Vol (µL)</th>
                                <th className="border border-black p-2 w-20">Weight (g)</th>
                                <th className="border border-black p-2 w-20">Vol (µL)</th>
                            </tr>
                            <tr>
                                <th className="border border-black p-2 bg-gray-50 text-left pl-4">BIL</th>
                                <th className="border border-black p-2 bg-white" colSpan={2}>Micropipette Volume Setting</th>
                                <th className="border border-black p-2 bg-white" colSpan={2}>Micropipette Volume Setting</th>
                                <th className="border border-black p-2 bg-white" colSpan={2}>Micropipette Volume Setting</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(10)].map((_, i) => (
                                <tr key={i}>
                                    <td className="border border-black p-1 text-center bg-gray-50 font-bold">{i + 1}</td>
                                    <td className="border border-black p-1"></td>
                                    <td className="border border-black p-1"></td>
                                    <td className="border border-black p-1"></td>
                                    <td className="border border-black p-1"></td>
                                    <td className="border border-black p-1"></td>
                                    <td className="border border-black p-1"></td>
                                </tr>
                            ))}
                            <tr>
                                <td className="border border-black p-1 text-left pl-2 font-bold bg-gray-100">Mean</td>
                                <td className="border border-black p-1"></td>
                                <td className="border border-black p-1"></td>
                                <td className="border border-black p-1"></td>
                                <td className="border border-black p-1"></td>
                                <td className="border border-black p-1"></td>
                                <td className="border border-black p-1"></td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1 text-left pl-2 font-bold bg-gray-100">Std Deviation</td>
                                <td className="border border-black p-1"></td>
                                <td className="border border-black p-1 bg-gray-200"></td>
                                <td className="border border-black p-1"></td>
                                <td className="border border-black p-1 bg-gray-200"></td>
                                <td className="border border-black p-1"></td>
                                <td className="border border-black p-1 bg-gray-200"></td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1 text-left pl-2 font-bold bg-gray-100">% Inaccuracy</td>
                                <td className="border border-black p-1 bg-gray-200" colSpan={2}></td>
                                <td className="border border-black p-1 bg-gray-200" colSpan={2}></td>
                                <td className="border border-black p-1 bg-gray-200" colSpan={2}></td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1 text-left pl-2 font-bold bg-gray-100">% Imprecision</td>
                                <td className="border border-black p-1 bg-gray-200" colSpan={2}></td>
                                <td className="border border-black p-1 bg-gray-200" colSpan={2}></td>
                                <td className="border border-black p-1 bg-gray-200" colSpan={2}></td>
                            </tr>
                             <tr>
                                <td className="border border-black p-2 text-center font-bold bg-gray-100">RESULT</td>
                                <td className="border border-black p-2" colSpan={2}></td>
                                <td className="border border-black p-2" colSpan={2}></td>
                                <td className="border border-black p-2" colSpan={2}></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-12 px-8">
                        <div className="text-center">
                            <p className="mb-8 border-b border-black w-48 mx-auto"></p>
                            <strong>CHECKED BY</strong><br/>
                            <span>DATE:</span>
                        </div>
                        <div className="text-center">
                            <p className="mb-8 border-b border-black w-48 mx-auto"></p>
                            <strong>VERIFIED BY</strong><br/>
                            <span>DATE:</span>
                        </div>
                    </div>
                    <div className="text-right mt-8 text-xs text-gray-500">
                      Effective date: 28.01.2026 (Ver.01)
                    </div>
                </div>
            )
        },
        {
            id: 'fe14.2',
            docNo: "HSAH/JPT/FE14.2",
            title: "VERIFICATION OF THERMOMETERS",
            content: (
                <div className="w-full text-sm font-mono">
                    <div className="mb-6 space-y-2 uppercase">
                        <div className="flex"><span className="w-48 font-bold">LAB:</span> <span>_________________________</span></div>
                        <div className="flex"><span className="w-48 font-bold">LOCATION:</span> <span>_________________________</span></div>
                        <div className="flex"><span className="w-48 font-bold">DATE:</span> <span>_________________________</span></div>
                        <div className="flex"><span className="w-48 font-bold">THERMOMETER ID:</span> <span>_________________________</span></div>
                        <div className="flex"><span className="w-48 font-bold">THERMOMETER RANGE:</span> <span>_________________________</span></div>
                        <div className="flex"><span className="w-48 font-bold">REF THERMOMETER ID:</span> <span>_________________________</span></div>
                    </div>
  
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        {/* Reference Table */}
                        <table className="w-full border-collapse border border-black text-xs text-center">
                            <thead>
                                 <tr className="bg-gray-100"><th colSpan={4} className="border border-black p-2">Reference Thermometer</th></tr>
                                <tr className="bg-gray-200">
                                    <th className="border border-black p-2">Temp Range</th>
                                    <th className="border border-black p-2">Time Interval</th>
                                    <th className="border border-black p-2">Reading (°C)</th>
                                    <th className="border border-black p-2">Average Reading (°C)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-black p-2" rowSpan={3}></td>
                                    <td className="border border-black p-2">10 min</td>
                                    <td className="border border-black p-2"></td>
                                    <td className="border border-black p-2" rowSpan={3}></td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-2">20 min</td>
                                    <td className="border border-black p-2"></td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-2">30 min</td>
                                    <td className="border border-black p-2"></td>
                                </tr>
                                {/* Second Block */}
                                 <tr>
                                    <td className="border border-black p-2" rowSpan={3}></td>
                                    <td className="border border-black p-2">10 min</td>
                                    <td className="border border-black p-2"></td>
                                    <td className="border border-black p-2" rowSpan={3}></td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-2">20 min</td>
                                    <td className="border border-black p-2"></td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-2">30 min</td>
                                    <td className="border border-black p-2"></td>
                                </tr>
                            </tbody>
                        </table>
  
                        {/* Working Table */}
                        <table className="w-full border-collapse border border-black text-xs text-center">
                            <thead>
                                <tr className="bg-gray-100"><th colSpan={4} className="border border-black p-2">Working Thermometer</th></tr>
                                <tr className="bg-gray-200">
                                    <th className="border border-black p-2">Temp Range</th>
                                    <th className="border border-black p-2">Time Interval</th>
                                    <th className="border border-black p-2">Reading (°C)</th>
                                    <th className="border border-black p-2">Average Reading (°C)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-black p-2" rowSpan={3}></td>
                                    <td className="border border-black p-2">10 min</td>
                                    <td className="border border-black p-2"></td>
                                    <td className="border border-black p-2" rowSpan={3}></td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-2">20 min</td>
                                    <td className="border border-black p-2"></td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-2">30 min</td>
                                    <td className="border border-black p-2"></td>
                                </tr>
                                 {/* Second Block */}
                                 <tr>
                                    <td className="border border-black p-2" rowSpan={3}></td>
                                    <td className="border border-black p-2">10 min</td>
                                    <td className="border border-black p-2"></td>
                                    <td className="border border-black p-2" rowSpan={3}></td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-2">20 min</td>
                                    <td className="border border-black p-2"></td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-2">30 min</td>
                                    <td className="border border-black p-2"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
  
                    <p className="text-xs mb-2 italic">Calculation : Correction (°C) = Average reference thermometer temp - average working thermometer temp (°C)</p>
  
                    <table className="w-full border-collapse border border-black mb-6 text-sm text-center">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-black p-2">Temp Range (°C)</th>
                                <th className="border border-black p-2">Average reference thermometer range (°C)</th>
                                <th className="border border-black p-2">Average working thermometer range (°C)</th>
                                <th className="border border-black p-2">Correction (°C) <br/><span className="text-[10px] font-normal">Correction factor ≤ 1.0°C</span></th>
                                <th className="border border-black p-2">RESULT (PASS/FAIL)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="h-12">
                                <td className="border border-black p-2"></td>
                                <td className="border border-black p-2"></td>
                                <td className="border border-black p-2"></td>
                                <td className="border border-black p-2"></td>
                                <td className="border border-black p-2"></td>
                            </tr>
                             <tr className="h-12">
                                <td className="border border-black p-2"></td>
                                <td className="border border-black p-2"></td>
                                <td className="border border-black p-2"></td>
                                <td className="border border-black p-2"></td>
                                <td className="border border-black p-2"></td>
                            </tr>
                        </tbody>
                    </table>
  
                    <div className="flex justify-between mt-12 px-8">
                        <div className="text-center">
                            <p className="mb-8 border-b border-black w-48 mx-auto"></p>
                            <strong>CHECKED BY</strong><br/>
                            <span>DATE:</span>
                        </div>
                        <div className="text-center">
                            <p className="mb-8 border-b border-black w-48 mx-auto"></p>
                            <strong>VERIFIED BY</strong><br/>
                            <span>DATE:</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'fe14.3',
            docNo: "HSAH/JPT/FE14.3",
            title: "VERIFICATION OF WEIGHING BALANCE",
            content: (
                <div className="w-full text-sm font-mono leading-tight">
                    {/* Header */}
                    <div className="font-bold mb-6">
                        <p className="mb-4">APPENDIX: WEIGHING BALANCE VERIFICATION FORM</p>
                        <p>JABATAN PERUBATAN TRANSFUSI</p>
                        <p>HOSPITAL SULTAN ABDUL HALIM</p>
                    </div>

                    <div className="border-2 border-black mb-6">
                        <div className="border-b border-black p-2 font-bold">
                            REKOD VERIFIKASI ALAT PENIMBANG (BALANCE VERIFICATION RECORD)
                        </div>
                        <div className="p-2 font-bold">
                            NO. BORANG: HSAH/JPT/FE14.3
                        </div>
                    </div>

                    {/* Section A */}
                    <h3 className="font-bold mb-2">A. BUTIRAN ALAT (EQUIPMENT DETAILS)</h3>
                    <table className="w-full border-collapse border border-black mb-6 text-sm">
                        <tbody>
                            <tr>
                                <td className="border border-black p-2 w-1/3 font-bold">Balance ID:</td>
                                <td className="border border-black p-2"></td>
                            </tr>
                            <tr>
                                <td className="border border-black p-2 font-bold">Jenama / Model (Brand/Model):</td>
                                <td className="border border-black p-2"></td>
                            </tr>
                            <tr>
                                <td className="border border-black p-2 font-bold">No. Siri (Serial No.):</td>
                                <td className="border border-black p-2"></td>
                            </tr>
                            <tr>
                                <td className="border border-black p-2 font-bold">Lokasi (Location):</td>
                                <td className="border border-black p-2"></td>
                            </tr>
                            <tr>
                                <td className="border border-black p-2 font-bold">Standard Weight ID:</td>
                                <td className="border border-black p-2"></td>
                            </tr>
                            <tr>
                                <td className="border border-black p-2 font-bold">Jisim Standard (Standard Mass):</td>
                                <td className="border border-black p-2 flex justify-end items-center gap-2">
                                     <span className="border-b border-black w-24 inline-block"></span> g
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black p-2 font-bold">Had Terima (Tolerance):</td>
                                <td className="border border-black p-2 flex justify-end items-center gap-2">
                                     ± <span className="border-b border-black w-24 inline-block"></span> g
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Section B */}
                    <h3 className="font-bold mb-1">B. REKOD UJIAN (TEST RECORD)</h3>
                    <p className="italic text-xs mb-2">Frequency: Monthly or as defined in schedule.</p>
                    <table className="w-full border-collapse border border-black mb-6 text-xs text-center">
                        <thead>
                            <tr className="bg-gray-100 align-middle">
                                <th className="border border-black p-1 w-24">Tarikh<br/>(Date)</th>
                                <th className="border border-black p-1">Bacaan Awal<br/>(Zero Check)<br/>(0.00 g?)</th>
                                <th className="border border-black p-1">Jisim Standard<br/>(Target Weight)</th>
                                <th className="border border-black p-1">Bacaan Sebenar<br/>(Actual Reading)</th>
                                <th className="border border-black p-1">Perbezaan<br/>(Deviation) (+/-)</th>
                                <th className="border border-black p-1 w-20">Status<br/>(Pass / Fail)</th>
                                <th className="border border-black p-1 w-24">Tandatangan<br/>(Sign)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(14)].map((_, i) => (
                                <tr key={i} className="h-10">
                                    <td className="border border-black p-1"></td>
                                    <td className="border border-black p-1 text-left pl-4 align-middle">[ ] OK</td>
                                    <td className="border border-black p-1"></td>
                                    <td className="border border-black p-1"></td>
                                    <td className="border border-black p-1"></td>
                                    <td className="border border-black p-1"></td>
                                    <td className="border border-black p-1"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Section C */}
                    <h3 className="font-bold mb-1">C. ULASAN / TINDAKAN PEMBETULAN (REMARKS / CORRECTIVE ACTION)</h3>
                    <p className="italic text-xs mb-4">(If Failed: Recalibrate, Inform SO, Label "Do Not Use")</p>
                    
                    <div className="border-b border-black h-8 mb-2"></div>
                    <div className="border-b border-black h-8 mb-2"></div>
                    <div className="border-b border-black h-8 mb-8"></div>

                    {/* Footer */}
                    <div className="mt-8">
                        <p className="font-bold mb-12">Disahkan Oleh (Verified By):</p>
                        
                        <div className="flex flex-col gap-1">
                            <p>..................................................................... (Pegawai Sains / Ketua Unit)</p>
                            <div className="flex items-center mt-2">
                                <span className="mr-2">Tarikh:</span>
                                <span className="border-b border-black w-48 inline-block"></span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
      ]
  },

  // --- WI 16.1: ACCEPTANCE TESTING PROCEDURE ---
  {
      id: 'wi16.1',
      docNo: "HSAH/JPT/WI16.1",
      relatedDoc: "HSAH/JPT/QP16",
      title: "ACCEPTANCE TESTING PROCEDURE FOR REAGENTS AND CONSUMABLES",
      versionNo: "01",
      amendmentNo: "00",
      dateOfIssue: "28/01/2026",
      preparedBy: {
        name: "Khor Hooi Siang",
        designation: "Scientific Officer",
        date: "28 January 2026"
      },
      approvedBy: {
        name: "Dr. Sakinah bt Ahmad",
        designation: "Head of Department",
        date: "28 January 2026"
      },
      content: {
          objectives: "To provide detailed instructions on how to perform acceptance testing on incoming reagents and consumables to ensure they are fit for purpose before being released for routine use.",
          scope: (
            <ul className="list-none space-y-2">
                <li>This instruction applies to:</li>
                <li>2.1 All new batches of reagents (e.g., Antisera, Cells, AHG).</li>
                <li>2.2 Critical consumables (e.g., Blood Bags, Apheresis Kits, Gel Cards).</li>
                <li>2.3 Test Kits (e.g., Viral Screening Kits).</li>
            </ul>
          ),
          references: (
             <div className="space-y-4">
                 <div className="flex gap-4">
                     <span className="font-bold min-w-[30px]">3.1</span>
                     <span><strong>Scientific Officer / Senior JTMP:</strong> Supervise the process and verify results.</span>
                 </div>
                 <div className="flex gap-4">
                     <span className="font-bold min-w-[30px]">3.2</span>
                     <span><strong>JTMP (Receiving Officer):</strong> Perform physical inspection and testing.</span>
                 </div>
             </div>
          ),
          definitions: (
              <div className="space-y-4">
                 <div className="flex gap-4">
                     <span className="font-bold min-w-[30px]">4.1</span>
                     <span>Delivery Order (DO) & Invoice.</span>
                 </div>
                 <div className="flex gap-4">
                     <span className="font-bold min-w-[30px]">4.2</span>
                     <span>Manufacturer’s Certificate of Analysis (COA).</span>
                 </div>
                 <div className="flex gap-4">
                     <span className="font-bold min-w-[30px]">4.3</span>
                     <span>Quality Control (QC) Materials (Known Positive/Negative samples).</span>
                 </div>
                 <div className="flex gap-4">
                     <span className="font-bold min-w-[30px]">4.4</span>
                     <span>Acceptance Testing Form (HSAH/JPT/FE16.1).</span>
                 </div>
             </div>
          ),
          records: [
              { no: "9.1", type: "ACCEPTANCE TESTING FORM", fileNo: "HSAH/JPT/FE16.1", location: "Laboratory", retention: "2 Years" },
              { no: "9.2", type: "COA and DO (Attached with test record)", fileNo: "-", location: "Laboratory", retention: "2 Years" },
          ],
          amendments: [
            {
                no: "00", version: "01", date: "28/01/2026",
                details: "First Issue for Jabatan Perubatan Transfusi"
            }
          ],
          distributionList: defaultDistribution,
      },
      procedures: [
          // 5.0 PHYSICAL INSPECTION
          {
              no: '5.1',
              activity: (
                  <>
                  <p className="font-bold mb-1">INSTRUCTION FOR PHYSICAL INSPECTION (UPON RECEIPT)</p>
                  <p><strong>Verify Documentation:</strong> Check that the Item Name, Catalog Number, Lot Number, and Quantity on the physical box match the Delivery Order (DO).</p>
                  </>
              ),
              responsibility: 'Receiving Officer'
          },
          {
              no: '5.2',
              activity: <p><strong>Check Integrity:</strong> Inspect packaging for any signs of damage, leakage, wetness, or broken seals.</p>,
              responsibility: 'Receiving Officer'
          },
          {
              no: '5.3',
              activity: <p><strong>Check Temperature:</strong> For cold-chain items (2-8°C or frozen), check the temperature logger or cool box condition immediately upon arrival.</p>,
              responsibility: 'Receiving Officer'
          },
          {
              no: '5.4',
              activity: <p><strong>Check Expiry:</strong> Ensure the items have sufficient shelf life remaining as per contract requirements.</p>,
              responsibility: 'Receiving Officer'
          },
          {
              no: '5.5',
              activity: <p>If any physical defect is found, <strong>quarantine</strong> the item and notify the Supplier immediately.</p>,
              responsibility: 'Receiving Officer'
          },
          // 6.0 PERFORMANCE TESTING
          {
              no: '6.1',
              activity: (
                  <>
                   <p className="font-bold mb-1">INSTRUCTION FOR PERFORMANCE TESTING (REAGENTS/KITS)</p>
                   <p>Select a representative sample from the new lot (e.g., one vial or one kit).</p>
                  </>
              ),
              responsibility: 'JTMP / SO'
          },
          {
              no: '6.2',
              activity: <p><strong>Visual Check:</strong> Inspect the reagent for turbidity, precipitates, or hemolysis (unless characteristic of the product).</p>,
              responsibility: 'JTMP'
          },
          {
              no: '6.3',
              activity: (
                  <>
                   <p><strong>Run Controls:</strong> Perform a QC run using:</p>
                   <ul className="list-disc list-inside ml-4 mt-1">
                       <li><strong>Positive Control:</strong> Must give a reaction strength consistent with the manufacturer's insert (e.g., 3+ to 4+ for antisera).</li>
                       <li><strong>Negative Control:</strong> Must show no agglutination/reaction.</li>
                   </ul>
                  </>
              ),
              responsibility: 'JTMP'
          },
          {
              no: '6.4',
              activity: <p><strong>Titer Check (If required):</strong> For critical antisera, perform a titer check to ensure potency meets standards.</p>,
              responsibility: 'Scientific Officer'
          },
          {
              no: '6.5',
              activity: <p><strong>Record Results:</strong> Document the reaction grades/results in the <em>Acceptance Testing Form</em>.</p>,
              responsibility: 'JTMP'
          },
          // 7.0 CRITICAL CONSUMABLES
           {
              no: '7.1',
              activity: (
                  <>
                   <p className="font-bold mb-1">INSTRUCTION FOR CRITICAL CONSUMABLES (BLOOD BAGS)</p>
                   <p><strong>Visual Inspection:</strong> Check inner packaging for vacuum loss (bag should not be loose inside the foil). Check anticoagulant solution for clarity and absence of particulate matter.</p>
                  </>
              ),
              responsibility: 'JTMP'
          },
          {
              no: '7.2',
              activity: <p><strong>Tubing Check:</strong> Inspect tubing for kinks, knots, or defects.</p>,
              responsibility: 'JTMP'
          },
          {
              no: '7.3',
              activity: <p><strong>Needle Check:</strong> Ensure needle covers are secure and undamaged.</p>,
              responsibility: 'JTMP'
          },
          // 8.0 FINAL EVALUATION
          {
              no: '8.1',
              activity: (
                   <>
                   <p className="font-bold mb-1">FINAL EVALUATION</p>
                   <p>Compare test results against the <strong>Certificate of Analysis (COA)</strong> or Manufacturer’s criteria.</p>
                   </>
              ),
              responsibility: 'SO / Senior JTMP'
          },
          {
              no: '8.2',
              activity: (
                   <>
                   <p><strong>PASS:</strong> If physical check AND performance test are satisfactory:</p>
                   <ul className="list-disc list-inside ml-4 mt-1">
                       <li>Circle "ACCEPTED" on the form.</li>
                       <li>Apply Green Sticker / "Approved for Use" label on the boxes.</li>
                       <li>Update the Inventory System (SPS/LIS).</li>
                   </ul>
                   </>
              ),
              responsibility: 'JTMP'
          },
           {
              no: '8.3',
              activity: (
                   <>
                   <p><strong>FAIL:</strong> If any criteria are not met:</p>
                   <ul className="list-disc list-inside ml-4 mt-1">
                       <li>Circle "REJECTED" on the form.</li>
                       <li>Apply Red Sticker / "DO NOT USE" label.</li>
                       <li>Isolate the item in the "Quarantine Area".</li>
                       <li>Fill out a <strong>Non-Conformance Report (NCR)</strong>.</li>
                   </ul>
                   </>
              ),
              responsibility: 'SO / Senior JTMP'
          },
      ],
      attachments: [
        {
          id: 'fe16.1',
          docNo: "HSAH/JPT/FE16.1",
          title: "BORANG UJIAN PENERIMAAN (ACCEPTANCE TESTING RECORD)",
          content: (
            <div className="w-full font-mono text-sm leading-tight">
               <div className="mb-4">
                  <h3 className="font-bold text-md mb-2 border-b border-black pb-1">A. BUTIRAN ITEM (ITEM DETAILS)</h3>
                  <div className="grid grid-cols-[1fr_2fr] border-t border-l border-black">
                      <div className="border-r border-b border-black p-2 bg-gray-50 font-bold">Tarikh Diterima (Date Received):</div>
                      <div className="border-r border-b border-black p-2"></div>
                      
                      <div className="border-r border-b border-black p-2 bg-gray-50 font-bold">Nama Item (Item Name):</div>
                      <div className="border-r border-b border-black p-2"></div>

                      <div className="border-r border-b border-black p-2 bg-gray-50 font-bold">Jenama / Pengeluar (Brand/Manufacturer):</div>
                      <div className="border-r border-b border-black p-2"></div>

                      <div className="border-r border-b border-black p-2 bg-gray-50 font-bold">No. Lot / Batch (Lot No.):</div>
                      <div className="border-r border-b border-black p-2"></div>

                      <div className="border-r border-b border-black p-2 bg-gray-50 font-bold">Tarikh Luput (Expiry Date):</div>
                      <div className="border-r border-b border-black p-2"></div>

                      <div className="border-r border-b border-black p-2 bg-gray-50 font-bold">Pembekal (Supplier):</div>
                      <div className="border-r border-b border-black p-2"></div>

                      <div className="border-r border-b border-black p-2 bg-gray-50 font-bold">No. DO (Delivery Order No.):</div>
                      <div className="border-r border-b border-black p-2"></div>

                      <div className="border-r border-b border-black p-2 bg-gray-50 font-bold">Kuantiti Diterima (Quantity):</div>
                      <div className="border-r border-b border-black p-2"></div>
                  </div>
               </div>

               <div className="mb-4">
                  <h3 className="font-bold text-md mb-2 border-b border-black pb-1">B. PEMERIKSAAN FIZIKAL (PHYSICAL INSPECTION)</h3>
                  <table className="w-full border-collapse border border-black text-xs">
                      <thead>
                          <tr className="bg-gray-100">
                              <th className="border border-black p-2 text-left w-1/2">Kriteria (Criteria)</th>
                              <th className="border border-black p-2 text-center w-24">Status</th>
                              <th className="border border-black p-2 text-left">Catatan (Remarks)</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td className="border border-black p-2">
                                  <strong>1. Keadaan Bungkusan:</strong> (Packaging Integrity - No tears/leaks)
                              </td>
                              <td className="border border-black p-2 text-center align-top">
                                  [ ] Pass<br/>[ ] Fail
                              </td>
                              <td className="border border-black p-2"></td>
                          </tr>
                          <tr>
                              <td className="border border-black p-2">
                                  <strong>2. Label & Segel:</strong> (Labeling & Seal - Matches DO, Seal intact)
                              </td>
                              <td className="border border-black p-2 text-center align-top">
                                  [ ] Pass<br/>[ ] Fail
                              </td>
                              <td className="border border-black p-2"></td>
                          </tr>
                          <tr>
                              <td className="border border-black p-2">
                                  <strong>3. Rantaian Sejuk:</strong> (Cold Chain - Temp 2-8°C / Frozen)
                              </td>
                              <td className="border border-black p-2 text-center align-top">
                                  [ ] Pass<br/>[ ] Fail
                              </td>
                              <td className="border border-black p-2 pt-4">
                                  Temp Logger Reading: ______ °C
                              </td>
                          </tr>
                          <tr>
                              <td className="border border-black p-2">
                                  <strong>4. Keadaan Produk:</strong> (Product Appearance - Clarity, No precipitates)
                              </td>
                              <td className="border border-black p-2 text-center align-top">
                                  [ ] Pass<br/>[ ] Fail
                              </td>
                              <td className="border border-black p-2"></td>
                          </tr>
                      </tbody>
                  </table>
               </div>

               <div className="mb-4">
                   <h3 className="font-bold text-md mb-2 border-b border-black pb-1">C. UJIAN PRESTASI / QC (PERFORMANCE TESTING)</h3>
                   <p className="text-xs italic mb-2">(Wajib untuk Reagen Baru / New Reagents Only)</p>
                   
                   <div className="flex gap-4 mb-2 text-xs">
                        <div className="flex-1 border-b border-black pb-1">QC Material Used:</div>
                        <div className="flex-1 border-b border-black pb-1">Lot No:</div>
                   </div>

                   <table className="w-full border-collapse border border-black text-xs">
                      <thead>
                          <tr className="bg-gray-100">
                              <th className="border border-black p-2 text-left w-1/4">Ujian (Test)</th>
                              <th className="border border-black p-2 text-left w-1/3">Jangkaan (Expected Result)</th>
                              <th className="border border-black p-2 text-left w-1/4">Keputusan Sebenar<br/>(Actual Result)</th>
                              <th className="border border-black p-2 text-center w-24">Status<br/>(Pass/Fail)</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr className="h-12">
                              <td className="border border-black p-2 font-bold">Positive Control</td>
                              <td className="border border-black p-2">(e.g., Agglutination 3+ to 4+)</td>
                              <td className="border border-black p-2"></td>
                              <td className="border border-black p-2 text-center">[ ] Pass [ ] Fail</td>
                          </tr>
                          <tr className="h-12">
                              <td className="border border-black p-2 font-bold">Negative Control</td>
                              <td className="border border-black p-2">(No Agglutination / No Hemolysis)</td>
                              <td className="border border-black p-2"></td>
                              <td className="border border-black p-2 text-center">[ ] Pass [ ] Fail</td>
                          </tr>
                          <tr className="h-12">
                              <td className="border border-black p-2 font-bold">Titer Check</td>
                              <td className="border border-black p-2">(If applicable)</td>
                              <td className="border border-black p-2"></td>
                              <td className="border border-black p-2 text-center">[ ] Pass [ ] Fail</td>
                          </tr>
                           <tr className="h-12">
                              <td className="border border-black p-2 font-bold">Consumable Check</td>
                              <td className="border border-black p-2">(e.g., Blood Bag Tubing/Anticoagulant)</td>
                              <td className="border border-black p-2"></td>
                              <td className="border border-black p-2 text-center">[ ] Pass [ ] Fail</td>
                          </tr>
                      </tbody>
                   </table>
               </div>

               <div className="mb-4">
                  <h3 className="font-bold text-md mb-2 border-b border-black pb-1">D. KEPUTUSAN AKHIR (FINAL DECISION)</h3>
                  <p className="mb-2">Berdasarkan pemeriksaan di atas, item ini adalah: <span className="italic">(Based on the inspection above, this item is:)</span></p>
                  
                  <div className="border border-black p-4 mb-4 space-y-4">
                      <div className="flex items-start gap-2">
                          <div className="w-6 h-6 border border-black flex-shrink-0"></div>
                          <div>
                              <strong>DITERIMA (ACCEPTED)</strong>
                              <p className="text-xs italic">Approved for routine use. Update Inventory Card.</p>
                          </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                           <div className="w-6 h-6 border border-black flex-shrink-0"></div>
                           <div>
                              <strong>DITOLAK (REJECTED)</strong>
                              <p className="text-xs italic">Do not use. Quarantine item and issue Non-Conformance Report (NCR).</p>
                              <div className="mt-1 border-b border-black w-64">NCR No:</div>
                           </div>
                      </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8 mt-8 border-t border-black pt-4">
                   <div>
                       <p className="font-bold mb-8">Dijalankan Oleh (Performed By):</p>
                       <div className="border-b border-black h-8 mb-2"></div>
                       <p className="text-xs">Tandatangan & Cop (JTMP)</p>
                       <div className="flex mt-2">
                           <span className="w-12">Tarikh:</span>
                           <div className="border-b border-black flex-1"></div>
                       </div>
                   </div>
                   <div>
                       <p className="font-bold mb-8">Disahkan Oleh (Verified By):</p>
                       <div className="border-b border-black h-8 mb-2"></div>
                       <p className="text-xs">Tandatangan & Cop (Pegawai Sains / Ketua Unit)</p>
                        <div className="flex mt-2">
                           <span className="w-12">Tarikh:</span>
                           <div className="border-b border-black flex-1"></div>
                       </div>
                   </div>
               </div>

            </div>
          )
        }
      ]
  },
  
  // --- QP 16: ACCEPTANCE TESTING ---
  {
      id: 'qp16',
      docNo: "HSAH/JPT/QP16",
      title: "ACCEPTANCE TESTING",
      versionNo: "01",
      amendmentNo: "00",
      dateOfIssue: "28/01/2026",
      preparedBy: { name: "Khor Hooi Siang", designation: "Scientific Officer", date: "28/01/2026" },
      approvedBy: { name: "Dr. Sakinah bt Ahmad", designation: "Head of Department", date: "28/01/2026" },
      content: {
          objectives: "To ensure that all incoming reagents and consumables are suitable for their intended use before being accepted into the inventory.",
          scope: "This procedure applies to all new batches of critical reagents, kits, and consumables purchased by Jabatan Perubatan Transfusi.",
          references: (
              <ul className="space-y-4">
                  <li className="flex gap-4">
                      <span className="font-bold min-w-[30px]">3.1</span>
                      <span>MS ISO 15189:2022 Medical Laboratories.</span>
                  </li>
                  <li className="flex gap-4">
                      <span className="font-bold min-w-[30px]">3.2</span>
                      <span>HSAH/JPT/QP15 Selection and Purchasing.</span>
                  </li>
              </ul>
          ),
          definitions: (
              <dl className="space-y-4">
                  <div className="flex gap-4">
                      <dt className="font-bold min-w-[200px]">4.1 Acceptance Testing:</dt>
                      <dd>Evaluation performed on new items to verify they meet specified requirements.</dd>
                  </div>
              </dl>
          ),
          amendments: [
              {
                  no: "00", version: "01", date: "28/01/2026",
                  details: "First Issue."
              }
          ],
          records: [
              { no: "6.1", type: "Acceptance Testing Form", fileNo: "HSAH/JPT/FE16.1", location: "Laboratory", retention: "2 Years" },
          ],
          distributionList: defaultDistribution,
      },
      procedures: [
          {
              no: '5.1',
              activity: <p><strong>Receiving:</strong> Verify items against Purchase Order and Delivery Order.</p>,
              responsibility: 'Receiving Officer'
          },
          {
              no: '5.2',
              activity: <p><strong>Quarantine:</strong> Place new items in a designated "Quarantine" area until accepted.</p>,
              responsibility: 'JTMP'
          },
          {
              no: '5.3',
              activity: <p><strong>Testing:</strong> Perform physical and functional checks as per WI 16.1.</p>,
              responsibility: 'Scientific Officer'
          },
          {
              no: '5.4',
              activity: <p><strong>Release:</strong> If passed, label as "Accepted" and move to storage.</p>,
              responsibility: 'Scientific Officer'
          },
      ]
  },

  // --- QP 15 (Existing Data) ---
  {
    id: 'qp15',
    docNo: "HSAH/JPT/QP15",
    title: "SELECTION AND PURCHASING OF EXTERNAL SERVICES, REAGENT AND CONSUMABLES",
    versionNo: "01",
    amendmentNo: "00",
    dateOfIssue: "28/01/2026",
    preparedBy: {
      name: "Khor Hooi Siang",
      designation: "Scientific Officer",
      date: "28 January 2026"
    },
    approvedBy: {
      name: "Dr. Sakinah bt Ahmad",
      designation: "Head of Department",
      date: "28 January 2026"
    },
    content: {
      objectives: "To ensure that all external services, reagents, and consumables purchased by Jabatan Perubatan Transfusi are selected, purchased, and evaluated systematically to meet the quality requirements and ensure uninterrupted service delivery.",
      scope: (
        <ul className="list-[lower-alpha] list-inside space-y-2">
            <li>Reagents (e.g., Antisera, Reverse Cells, Gel Cards).</li>
            <li>Consumables (e.g., Blood Bags, Apheresis Kits, Test Tubes).</li>
            <li>External Services (e.g., Equipment Calibration, Referral Testing).</li>
        </ul>
      ),
      references: (
        <ul className="space-y-4">
            <li className="flex gap-4">
                <span className="font-bold min-w-[30px]">3.1</span>
                <span>MS ISO 15189:2022 Medical Laboratories — Requirements for Quality and Competence.</span>
            </li>
            <li className="flex gap-4">
                <span className="font-bold min-w-[30px]">3.2</span>
                <span>Tatacara Pengurusan Stor Kerajaan (TPS).</span>
            </li>
            <li className="flex gap-4">
                <span className="font-bold min-w-[30px]">3.3</span>
                <span>Arahan Perbendaharaan (Treasury Instructions).</span>
            </li>
            <li className="flex gap-4">
                <span className="font-bold min-w-[30px]">3.4</span>
                <span>HSAH/JPT/QP16 Acceptance Testing.</span>
            </li>
        </ul>
      ),
      definitions: (
         <dl className="space-y-4">
            <div className="flex gap-4">
                <dt className="font-bold min-w-[200px]">4.1 ALAT:</dt>
                <dd>Equipment / Instrument.</dd>
            </div>
            <div className="flex gap-4">
                <dt className="font-bold min-w-[200px]">4.2 DO:</dt>
                <dd>Delivery Order.</dd>
            </div>
            <div className="flex gap-4">
                <dt className="font-bold min-w-[200px]">4.3 PO:</dt>
                <dd>Purchase Order / Pesanan Tempatan (LPO).</dd>
            </div>
            <div className="flex gap-4">
                <dt className="font-bold min-w-[200px]">4.4 SO:</dt>
                <dd>Scientific Officer.</dd>
            </div>
             <div className="flex gap-4">
                <dt className="font-bold min-w-[200px]">4.5 HOD:</dt>
                <dd>Head of Department.</dd>
            </div>
             <div className="flex gap-4">
                <dt className="font-bold min-w-[200px]">4.6 e-Perolehan:</dt>
                <dd>Government Electronic Procurement System.</dd>
            </div>
             <div className="flex gap-4">
                <dt className="font-bold min-w-[200px]">4.7 Contract Item:</dt>
                <dd>Items purchased centrally by Ministry of Health (MOH) or Pharmaniaga.</dd>
            </div>
         </dl>
      ),
      amendments: [
        {
            no: "00", version: "01", date: "28/01/2026",
            details: "First Issue for Jabatan Perubatan Transfusi"
        }
      ],
      records: [
        { no: "6.1", type: "Purchase Request Forms", fileNo: "HSAH/JPT/FE15.1", location: "Admin Office", retention: "7 Years" },
        { no: "6.2", type: "Local Purchase Orders (LPO)", fileNo: "-", location: "Admin Office", retention: "7 Years" },
        { no: "6.3", type: "Delivery Orders (DO)", fileNo: "-", location: "Admin Office", retention: "7 Years" },
        { no: "6.4", type: "Supplier Evaluation Forms", fileNo: "HSAH/JPT/FE15.2", location: "Admin Office", retention: "7 Years" },
        { no: "6.5", type: "Indent / Pharmaniaga Records", fileNo: "-", location: "Admin Office", retention: "7 Years" },
      ],
      distributionList: defaultDistribution,
      flowchart: (
         <div className="flex flex-col items-center gap-4 text-sm border p-8 border-gray-300 bg-gray-50 rounded">
            <div className="border-2 border-black px-6 py-2 rounded-full font-bold bg-white text-center">Start: User identifies need</div>
            <div className="h-6 w-0.5 bg-black"></div>
            <div className="border-2 border-black px-4 py-4 transform rotate-45 bg-white w-32 h-32 flex items-center justify-center shadow-sm">
                <div className="transform -rotate-45 font-bold text-center">
                    <p>Stock Check?</p>
                </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-4 mt-2 max-w-lg">
                <div className="flex flex-col items-center">
                    <div className="font-bold text-green-600 mb-1">ADEQUATE</div>
                     <div className="border-2 border-black px-4 py-2 bg-green-50 text-center w-full">No Purchase</div>
                </div>
                <div className="flex flex-col items-center">
                     <div className="font-bold text-red-600 mb-1">LOW</div>
                     <div className="border-2 border-black px-4 py-2 bg-red-50 text-center w-full">Proceed to Purchase</div>
                </div>
            </div>
             <div className="h-6 w-0.5 bg-black mt-2"></div>
             <div className="border-2 border-black px-6 py-2 bg-white text-center">Approve: HOD approves Request</div>
             <div className="h-6 w-0.5 bg-black"></div>
             <div className="border-2 border-black px-6 py-2 bg-white text-center">Order: e-Perolehan / Contract</div>
             <div className="h-6 w-0.5 bg-black"></div>
             <div className="border-2 border-black px-6 py-2 bg-white text-center">Receive: Goods arrive</div>
             <div className="h-6 w-0.5 bg-black"></div>
             <div className="border-2 border-black px-6 py-2 bg-white text-center">Inspection (QP16): Check Temp, Expiry</div>
             <div className="h-6 w-0.5 bg-black"></div>
             <div className="border-2 border-black px-4 py-4 transform rotate-45 bg-white w-32 h-32 flex items-center justify-center shadow-sm">
                <div className="transform -rotate-45 font-bold text-center">
                    <p>Pass?</p>
                </div>
            </div>
             <div className="w-full grid grid-cols-2 gap-4 mt-2 max-w-lg">
                <div className="flex flex-col items-center">
                    <div className="font-bold text-red-600 mb-1">FAIL</div>
                     <div className="border-2 border-black px-4 py-2 bg-red-50 text-center w-full">Return to Supplier</div>
                </div>
                <div className="flex flex-col items-center">
                     <div className="font-bold text-green-600 mb-1">PASS</div>
                     <div className="border-2 border-black px-4 py-2 bg-green-50 text-center w-full">Enter into Store</div>
                </div>
            </div>
            <div className="h-6 w-0.5 bg-black mt-2"></div>
            <div className="border-2 border-black px-6 py-2 rounded-full font-bold bg-white text-center">End: Distribute to Lab</div>
        </div>
      )
    },
    procedures: [
        {
        no: '5.1',
        activity: (
            <>
            <p className="font-bold mb-2">Selection of Reagents, Consumables, and Services</p>
            <ol className="list-[lower-alpha] list-inside space-y-2">
                <li><strong>New Items:</strong> When a new item is required, evaluate based on:
                    <ul className="list-[lower-roman] list-inside ml-4 mt-1">
                        <li>Clinical need and urgency.</li>
                        <li>Quality specifications (Sensitivity, Specificity).</li>
                        <li>Cost-effectiveness.</li>
                        <li>Vendor reliability and after-sales support.</li>
                    </ul>
                </li>
                <li><strong>Contract Items:</strong> For items under central contract (e.g., Blood Bags), follow the MOH Approved Product List (APL).</li>
                <li><strong>Evaluation:</strong> Request samples for evaluation if necessary (refer QP16).</li>
            </ol>
            </>
        ),
        responsibility: 'HOD / SO'
        },
        {
        no: '5.2',
        activity: (
            <>
            <p className="font-bold mb-2">Purchasing Process</p>
            <ol className="list-[lower-alpha] list-inside space-y-2">
                <li><strong>Stock Review:</strong> Check stock levels in the Store Inventory System (SPS) or Stock Cards to determine quantity needed.</li>
                <li><strong>Purchase Request:</strong>
                    <ul className="list-[lower-roman] list-inside ml-4 mt-1">
                        <li>Staff fills out Permohonan Pembelian (HSAH/JPT/FE15.1).</li>
                        <li>Obtain approval from HOD.</li>
                    </ul>
                </li>
                 <li><strong>Ordering:</strong>
                    <ul className="list-[lower-roman] list-inside ml-4 mt-1">
                        <li><strong>Direct Purchase (&lt;RM 20k):</strong> Request 3 quotations (if applicable) and issue LPO via e-Perolehan.</li>
                        <li><strong>Contract/Pharmaniaga:</strong> Place order via the designated online portal based on quota.</li>
                        <li><strong>Emergency Purchase:</strong> Proceed with "Perolehan Darurat" procedures if critical stock is critically low (requires Justification Letter).</li>
                    </ul>
                </li>
            </ol>
            </>
        ),
        responsibility: 'SO / Admin'
        },
        {
        no: '5.3',
        activity: (
            <>
            <p className="font-bold mb-2">Receiving and Verification</p>
            <ol className="list-[lower-alpha] list-inside space-y-2">
                <li>Upon arrival of goods:
                    <ul className="list-[lower-roman] list-inside ml-4 mt-1">
                        <li>Match DO with LPO/Order list.</li>
                        <li>Check physical condition (integrity of packaging).</li>
                        <li><strong>Check Cold Chain:</strong> Verify temperature logger for reagents (2-8°C).</li>
                        <li>Check Expiry Date (Must be &gt;18 months or as per agreement).</li>
                    </ul>
                </li>
                <li>Perform <strong>Acceptance Testing</strong> (Refer HSAH/JPT/QP16).</li>
                <li>If Accept: Sign DO and update Stock Card (Kad Petak/KEW.PS).</li>
                <li>If Reject: Return to supplier with Non-Conformance Report.</li>
            </ol>
            </>
        ),
        responsibility: 'Pegawai Penerima'
        },
        {
        no: '5.4',
        activity: (
            <>
            <p className="font-bold mb-2">Emergency Procurement</p>
            <p className="mb-2">In case of unexpected stockout or outbreak:</p>
            <ol className="list-[lower-roman] list-inside space-y-2 ml-4">
                <li>Contact supplier directly for immediate delivery.</li>
                <li>Borrow from other hospitals (nearby Pathology/Transfusion centers).</li>
                <li>Issue confirmation LPO/Paperwork immediately after.</li>
            </ol>
            </>
        ),
        responsibility: 'HOD / SO'
        },
        {
        no: '5.5',
        activity: (
            <>
            <p className="font-bold mb-2">Evaluation of Suppliers</p>
            <ul className="list-[lower-alpha] list-inside space-y-2">
                <li><strong>Frequency:</strong> Annually.</li>
                <li><strong>Method:</strong> Use Borang Penilaian Prestasi Pembekal (HSAH/JPT/FE15.2).</li>
                <li><strong>Criteria:</strong>
                    <ul className="list-[lower-roman] list-inside ml-4 mt-1">
                        <li>Delivery Time (On time?).</li>
                        <li>Product Quality (Defects?).</li>
                        <li>Customer Service (Responsiveness?).</li>
                    </ul>
                </li>
                <li><strong>Action:</strong> Suppliers with poor scores (&lt;50%) will be issued a warning letter or blacklisted from future direct purchases.</li>
            </ul>
            </>
        ),
        responsibility: 'SO / HOD'
        },
    ]
  },
  
  // --- QP 12: SELECTION AND PURCHASING AND MANAGEMENT OF EQUIPMENTS ---
  {
    id: 'qp12',
    docNo: "HSAH/JPT/QP12",
    title: "SELECTION AND PURCHASING AND MANAGEMENT OF EQUIPMENTS",
    versionNo: "01",
    amendmentNo: "00",
    dateOfIssue: "01/01/2026",
    preparedBy: { name: "TBA", designation: "Scientific Officer", date: "01/01/2026" },
    approvedBy: { name: "Dr. Sakinah bt Ahmad", designation: "Head of Department", date: "01/01/2026" },
    content: {
        objectives: "This procedure outlines the process of selection, purchasing, and management of equipment to ensure all equipment used in the Jabatan Perubatan Transfusi is fit for purpose and maintained in optimal condition.",
        scope: "The procedure applies to the Jabatan Perubatan Transfusi, Hospital Sultan Abdul Halim, Sungai Petani.",
        references: (
            <ul className="space-y-4">
                <li className="flex gap-4">
                    <span className="font-bold min-w-[30px]">3.1</span>
                    <span>MS ISO 15189:2022 Medical Laboratories — Requirements for Quality and Competence.</span>
                </li>
                <li className="flex gap-4">
                    <span className="font-bold min-w-[30px]">3.2</span>
                    <span>Ministry of Health Malaysia Asset Management Guidelines.</span>
                </li>
                <li className="flex gap-4">
                    <span className="font-bold min-w-[30px]">3.3</span>
                    <span>HSAH/JPT/QP13 Method Verification (Cross-reference).</span>
                </li>
            </ul>
        ),
        definitions: (
             <dl className="space-y-4">
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.1 Penyelaras Aset (Asset Coordinator):</dt>
                    <dd>Person appointed by HOD to monitor or supervise the equipment in the laboratory/unit.</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.2 Pegawai Aset (Asset Officer):</dt>
                    <dd>Person appointed by Hospital Director to monitor equipment in the Hospital.</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.3 Users:</dt>
                    <dd>Staff utilizing the equipment in the unit.</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.4 HSS:</dt>
                    <dd>Hospital Support Service Provider.</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.5 PPM:</dt>
                    <dd>Planned Preventive Maintenance.</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.6 PO:</dt>
                    <dd>Purchase Order.</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.7 DO:</dt>
                    <dd>Delivery Order.</dd>
                </div>
             </dl>
        ),
        amendments: [
            {
                no: "00", version: "01", date: "01/01/2026",
                details: "First Issue for Jabatan Perubatan Transfusi"
            }
        ],
        records: [
            { no: "6.1", type: "DAFTAR HARTA MODAL (KEW.PA 2)", fileNo: "HSAH/JPT/FE1.0", location: "Admin Room", retention: "Lifetime of Instrument" },
            { no: "6.2", type: "DAFTAR INVENTORI (KEW.PA 3)", fileNo: "HSAH/JPT/FE3.0", location: "Admin Room", retention: "Lifetime of Instrument" },
            { no: "6.3", type: "REKOD PELUPUSAN ASET", fileNo: "HSAH/JPT/FE5.0", location: "Admin Room", retention: "Lifetime of Instrument" },
            { no: "6.4", type: "PPM / SERVICE REPORTS", fileNo: "HSAH/JPT/FE6.0", location: "Admin Room", retention: "Lifetime of Instrument" },
            { no: "6.5", type: "EQUIPMENT MANUALS / IFU", fileNo: "N/A", location: "Respective Unit", retention: "Lifetime of Instrument" },
            { no: "6.6", type: "SUPPLIER EVALUATION RECORDS", fileNo: "HSAH/JPT/FE8.0", location: "Admin Room", retention: "7 Years" },
        ],
        distributionList: defaultDistribution,
        flowchart: (
            <div className="flex flex-col items-center gap-4 text-sm border p-8 border-gray-300 bg-gray-50 rounded">
                <div className="border-2 border-black px-6 py-2 rounded-full font-bold bg-white">Selection & Purchasing of equipment</div>
                <div className="h-6 w-0.5 bg-black"></div>
                <div className="border-2 border-black px-6 py-2 bg-white">Receive & Verify</div>
                <div className="h-6 w-0.5 bg-black"></div>
                <div className="border-2 border-black px-6 py-2 transform rotate-45 bg-white w-32 h-32 flex items-center justify-center">
                    <span className="transform -rotate-45 font-bold text-center">Acceptance Testing</span>
                </div>
                <div className="h-6 w-0.5 bg-black"></div>
                <div className="border-2 border-black px-6 py-2 bg-white">Register equipment</div>
                <div className="h-6 w-0.5 bg-black"></div>
                <div className="border-2 border-black px-6 py-2 bg-white">User Training</div>
                <div className="h-6 w-0.5 bg-black"></div>
                <div className="border-2 border-black px-6 py-2 bg-white">Monitor equipment maintenance & repair</div>
                <div className="h-6 w-0.5 bg-black"></div>
                <div className="border-2 border-black px-6 py-2 rounded-full font-bold bg-white">Evaluation supplier</div>
            </div>
        )
    },
    procedures: [
       {
           no: '5.1',
           activity: (
               <>
                <p className="font-bold mb-2">Selection and Purchasing</p>
                <ol className="list-[lower-alpha] list-inside space-y-2">
                    <li>Identify the equipment required.</li>
                    <li>Prepare specification of the equipment.</li>
                    <li>Request quotation from potential suppliers.</li>
                    <li>Select supplier based on criteria:
                        <ul className="list-[lower-roman] list-inside ml-4">
                            <li>Item specification compliance.</li>
                            <li>Supplier performance history.</li>
                            <li>Pricing.</li>
                        </ul>
                    </li>
                    <li>Submit request to Unit Aset Hospital or process via e-Perolehan if necessary.</li>
                </ol>
               </>
           ),
           responsibility: 'HOD / SO / Asset Coordinator'
       },
       {
           no: '5.2',
           activity: (
               <>
                <p className="font-bold mb-2">Receiving and Registration of New Equipment</p>
                <ol className="list-[lower-alpha] list-inside space-y-2">
                    <li>Check equipment thoroughly to ensure it meets specifications.</li>
                    <li>Verify details in the document (DO) match the equipment received.</li>
                    <li>Verify equipment by counting, weighing, or testing immediately.</li>
                    <li>If verification cannot be done immediately, note on DO: "Accepted with condition the equipment will be verified later...".</li>
                    <li>Register equipment (KEW.PA) after successful acceptance testing.</li>
                    <li>If damaged or non-compliant, do not accept the equipment.</li>
                </ol>
               </>
           ),
           responsibility: 'Pegawai Penerima'
       },
       {
           no: '5.3',
           activity: (
               <>
                <p className="font-bold mb-2">Acceptance Testing</p>
                <ol className="list-[lower-alpha] list-inside space-y-2">
                    <li>Perform Acceptance Testing (Installation Qualification/Operational Qualification). This is done by qualified personnel/supplier with HSS assistance.</li>
                    <li>Verify equipment capability to achieve necessary performance (Method Verification) before use in testing (Refer HSAH/JPT/QP13).</li>
                    <li>Label the equipment (Asset Number, HSS Number, Status Label).</li>
                </ol>
               </>
           ),
           responsibility: 'Scientific Officer / Asset Coordinator'
       },
       {
           no: '5.4',
           activity: (
               <>
                <p className="font-bold mb-2">Equipment Instruction For Use & Training</p>
                <ol className="list-[lower-alpha] list-inside space-y-2">
                    <li>Conduct briefing and user training.
                         <ul className="list-[lower-roman] list-inside ml-4">
                            <li>Assess competency of personnel.</li>
                            <li>Prepare list of authorized personnel.</li>
                         </ul>
                    </li>
                    <li>Keep equipment records and User Manuals in the respective unit for easy reference (safety, maintenance, handling).</li>
                </ol>
               </>
           ),
           responsibility: 'Asset Coordinator'
       },
       {
           no: '5.5',
           activity: (
               <>
                <p className="font-bold mb-2">Equipment Maintenance and Repair</p>
                <ol className="list-[lower-alpha] list-inside space-y-2">
                    <li>Daily/Weekly Maintenance: Perform as required by manufacturer/user manual. Keep records.</li>
                    <li>PPM (Planned Preventive Maintenance):
                         <ul className="list-[lower-roman] list-inside ml-4">
                             <li>Obtain PPM schedule from HSS/Vendor.</li>
                             <li>Ensure PPM is carried out.</li>
                             <li>Update PPM sticker.</li>
                         </ul>
                    </li>
                    <li>Defective Equipment:
                         <ul className="list-[lower-roman] list-inside ml-4">
                             <li>Identify and label "OUT OF SERVICE".</li>
                             <li>Report to HSS/Vendor.</li>
                             <li>Verify performance (QC) before returning to service.</li>
                         </ul>
                    </li>
                </ol>
               </>
           ),
           responsibility: 'Users / Asset Coordinator / HSS'
       },
       {
           no: '5.6',
           activity: (
               <>
                <p className="font-bold mb-2">Adverse Incident Reporting</p>
                <ol className="list-[lower-alpha] list-inside space-y-2">
                    <li>Investigate and report incidents/accidents attributed directly to equipment.</li>
                    <li>Refer to Non-conformance & Corrective Action procedures.</li>
                </ol>
               </>
           ),
           responsibility: 'Safety Officer / Asset Coordinator'
       },
       {
           no: '5.7',
           activity: (
               <>
                <p className="font-bold mb-2">Evaluation of Suppliers</p>
                <ol className="list-[lower-alpha] list-inside space-y-2">
                    <li>Evaluate the performance of equipment suppliers annually.</li>
                    <li>Fill up form Penilaian Syarikat dan Pembekal (HSAH/PAT/F-013 or JPT equivalent).</li>
                    <li>Keep all records.</li>
                </ol>
               </>
           ),
           responsibility: 'Asset Coordinator / HOD'
       }
    ]
  },

  // --- QP 13: VALIDATION AND VERIFICATION OF EQUIPMENT ---
  {
    id: 'qp13',
    docNo: "HSAH/JPT/QP13",
    title: "VALIDATION AND VERIFICATION OF EQUIPMENT",
    versionNo: "01",
    amendmentNo: "00",
    dateOfIssue: "01/01/2026",
    preparedBy: { name: "TBA", designation: "Scientific Officer", date: "01/01/2026" },
    approvedBy: { name: "TBA", designation: "Head of Department", date: "01/01/2026" },
    content: {
        objectives: "To provide documented evidence that an item of equipment, process, or system is in a state of control and is able to consistently deliver specified results. This procedure ensures all equipment is qualified prior to implementation.",
        scope: (
            <>
                <p>This procedure applies to all critical equipment in Jabatan Perubatan Transfusi, specifically:</p>
                <ul className="list-[lower-alpha] list-inside ml-4 mt-2">
                    <li>New equipment.</li>
                    <li>Equipment after major repair.</li>
                    <li>Equipment moved to a new location.</li>
                </ul>
            </>
        ),
        references: (
            <ul className="space-y-4">
                <li className="flex gap-4">
                    <span className="font-bold min-w-[30px]">3.1</span>
                    <span>MS ISO 15189:2022 Medical Laboratories — Requirements for Quality and Competence.</span>
                </li>
                <li className="flex gap-4">
                    <span className="font-bold min-w-[30px]">3.2</span>
                    <span>Guide to The Preparation, Use and Quality Assurance of Blood Components, Council of Europe.</span>
                </li>
                <li className="flex gap-4">
                    <span className="font-bold min-w-[30px]">3.3</span>
                    <span>Manufacturer's User Manuals.</span>
                </li>
            </ul>
        ),
        definitions: (
             <dl className="space-y-4">
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.1 Validation:</dt>
                    <dd>Documented evidence that a process or system consistently meets predetermined specifications.</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.2 IQ (Installation Qualification):</dt>
                    <dd>Verification of correct equipment installation against design specifications.</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.3 OQ (Operational Qualification):</dt>
                    <dd>Verification of correct equipment operation under various conditions.</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.4 PQ (Performance Qualification):</dt>
                    <dd>Verification that the system performs correctly and meets the user's intended purpose under actual load.</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.5 Temperature Mapping:</dt>
                    <dd>Process of recording temperatures in a space over a set period to identify hot and cold spots.</dd>
                </div>
             </dl>
        ),
        amendments: [
            {
                no: "00", version: "01", date: "01/01/2026",
                details: "First Issue for Jabatan Perubatan Transfusi"
            }
        ],
        records: [
            { no: "6.1", type: "VALIDATION MASTER PLAN", fileNo: "HSAH/JPT/FE...", location: "Admin Room", retention: "Lifetime of Equipment" },
            { no: "6.2", type: "IQ, OQ, PQ REPORTS", fileNo: "HSAH/JPT/FE...", location: "Admin Room", retention: "Lifetime of Equipment" },
            { no: "6.3", type: "TEMPERATURE MAPPING RAW DATA", fileNo: "N/A", location: "Server/Cloud", retention: "7 Years" },
            { no: "6.4", type: "CALIBRATION CERTIFICATES (THERMOMETERS/LOGGERS)", fileNo: "HSAH/JPT/FE...", location: "Admin Room", retention: "Lifetime of Equipment" },
        ],
        distributionList: defaultDistribution,
        flowchart: (
            <div className="flex flex-col items-center gap-4 text-sm border p-8 border-gray-300 bg-gray-50 rounded">
                <div className="border-2 border-black px-6 py-2 rounded-full font-bold bg-white text-center">Start: Identify New/Repaired Equipment</div>
                <div className="h-6 w-0.5 bg-black"></div>
                <div className="border-2 border-black px-6 py-2 bg-white text-center">Step 1 (IQ): Check installation, power, environment, manuals</div>
                <div className="h-6 w-0.5 bg-black"></div>
                <div className="border-2 border-black px-6 py-2 bg-white text-center">Step 2 (OQ): Check alarms, function, and Empty Mapping (24H)</div>
                <div className="h-6 w-0.5 bg-black"></div>
                <div className="border-2 border-black px-6 py-2 bg-white text-center">Step 3 (PQ): Check Full Load Mapping (24H) and Door Open recovery</div>
                <div className="h-6 w-0.5 bg-black"></div>
                <div className="border-2 border-black px-4 py-4 transform rotate-45 bg-white w-40 h-40 flex items-center justify-center shadow-sm">
                    <div className="transform -rotate-45 font-bold text-center">
                        <p>Do results meet Acceptance Criteria?</p>
                    </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-4 mt-2">
                    <div className="flex flex-col items-center">
                        <div className="font-bold text-red-600 mb-1">NO</div>
                        <div className="border-2 border-black px-4 py-2 bg-red-50 text-center w-full">Perform Corrective Action (Repair/Adjust) -&gt; Retest</div>
                    </div>
                    <div className="flex flex-col items-center">
                         <div className="font-bold text-green-600 mb-1">YES</div>
                         <div className="border-2 border-black px-4 py-2 bg-green-50 text-center w-full">Generate Validation Report</div>
                    </div>
                </div>
                <div className="h-6 w-0.5 bg-black mt-2"></div>
                <div className="border-2 border-black px-6 py-2 rounded-full font-bold bg-white text-center">End: Approve for Routine Use</div>
            </div>
        )
    },
    procedures: [
       {
           no: '5.1',
           activity: (
               <>
                <p className="font-bold mb-2">General Requirements</p>
                <ol className="list-[lower-alpha] list-inside space-y-2">
                    <li>Identify equipment requiring validation (e.g., Fridges, Freezers, Centrifuges).</li>
                    <li>Validation must be performed for:
                        <ul className="list-[lower-roman] list-inside ml-4">
                            <li>New equipment installation.</li>
                            <li>Re-installation after repair.</li>
                            <li>Relocation of equipment.</li>
                        </ul>
                    </li>
                </ol>
               </>
           ),
           responsibility: 'SO / Asset Coordinator'
       },
       {
           no: '5.2',
           activity: (
               <>
                <p className="font-bold mb-2">Installation Qualification (IQ)</p>
                <ol className="list-[lower-alpha] list-inside space-y-2">
                    <li><strong>Verify Installation:</strong> Ensure equipment matches design specs and asset number is recorded.</li>
                    <li><strong>Environmental Check:</strong> Verify space, temperature, and humidity conditions.</li>
                    <li><strong>Utilities Check:</strong> Verify power supply, backup power, and connections.</li>
                    <li><strong>Documentation:</strong> Ensure User Manuals, Calibration Certificates, and Spare Parts lists are present.</li>
                    <li><strong>Safety:</strong> Verify emergency stops and alarms are present.</li>
                </ol>
               </>
           ),
           responsibility: 'SO / Vendor'
       },
       {
           no: '5.3',
           activity: (
               <>
                <p className="font-bold mb-2">Operational Qualification (OQ)</p>
                <p className="mb-2 italic">Objective: To verify functionality under various conditions.</p>
                <ol className="list-[lower-alpha] list-inside space-y-2">
                    <li><strong>Functionality Tests:</strong>
                        <ul className="list-[lower-roman] list-inside ml-4">
                            <li>Power On/Off and Display checks.</li>
                            <li>Alarm Tests: Check "Door Open", "High Temperature", and "Low Temperature" alarms.</li>
                            <li>Power Failure Test: Disconnect power to verify battery backup/alarm.</li>
                        </ul>
                    </li>
                    <li><strong>OQ Mapping (For Storage Equipment):</strong>
                         <ul className="list-[lower-roman] list-inside ml-4">
                            <li>Perform on EMPTY equipment.</li>
                            <li>Duration: Minimum 24 Hours.</li>
                            <li>Data Logging Interval: 1 minute.</li>
                            <li>Door Opening Test: Open door for 1 minute (2 occasions) and monitor recovery time.</li>
                         </ul>
                    </li>
                </ol>
               </>
           ),
           responsibility: 'SO / Vendor'
       },
       {
           no: '5.4',
           activity: (
               <>
                <p className="font-bold mb-2">Performance Qualification (PQ)</p>
                <p className="mb-2 italic">Objective: To verify performance under actual use conditions.</p>
                <ol className="list-[lower-alpha] list-inside space-y-2">
                    <li><strong>PQ Mapping (For Storage Equipment):</strong>
                         <ul className="list-[lower-roman] list-inside ml-4">
                            <li>Perform on equipment with FULL LOAD (product or simulation material).</li>
                            <li>Duration: Minimum 24 Hours.</li>
                            <li>Logger Placement: Top, Bottom, Middle, Front, Back (covering all critical zones).</li>
                            <li>Worst Case Scenario: Test maximum operational range if applicable.</li>
                         </ul>
                    </li>
                </ol>
               </>
           ),
           responsibility: 'SO / Vendor'
       },
       {
           no: '5.5',
           activity: (
               <>
                <p className="font-bold mb-2">Acceptance Criteria & Reporting</p>
                <ol className="list-[lower-alpha] list-inside space-y-2">
                    <li><strong>Criteria:</strong>
                         <ul className="list-[lower-roman] list-inside ml-4">
                             <li>All IQ checks are satisfactory.</li>
                             <li>OQ/PQ temperatures remain within specified range (e.g., 2-6°C for blood fridge).</li>
                             <li>No significant deviation in hot/cold spots.</li>
                         </ul>
                    </li>
                    <li><strong>Reporting:</strong>
                         <ul className="list-[lower-roman] list-inside ml-4">
                             <li>Compile IQ, OQ, and PQ data into a Validation Report.</li>
                             <li>Obtain approval from HOD before releasing equipment for use.</li>
                         </ul>
                    </li>
                </ol>
               </>
           ),
           responsibility: 'HOD / SO'
       }
    ]
  },
  
  // --- QP 14: CALIBRATION AND IN HOUSE CHECKING OF EQUIPMENTS ---
  {
    id: 'qp14',
    docNo: "HSAH/JPT/QP14",
    title: "CALIBRATION AND IN HOUSE CHECKING OF EQUIPMENTS",
    versionNo: "01",
    amendmentNo: "00",
    dateOfIssue: "28/01/2026",
    preparedBy: { name: "Khor Hooi Siang", designation: "Scientific Officer", date: "28 January 2026" },
    approvedBy: { name: "Dr. Sakinah bt Ahmad", designation: "Head of Department", date: "28 January 2026" },
    content: {
        objectives: "To ensure that all measuring equipment used in Jabatan Perubatan Transfusi is calibrated and verified at defined intervals to maintain accuracy, reliability, and traceability of measurement results in accordance with MS ISO 15189 standards.",
        scope: "This procedure applies to all measuring equipment used in the department, including but not limited to: a. Thermometers (Digital & Glass) and Temperature Loggers. b. Pipettes (Automatic & Manual). c. Timers and Stopwatches. d. Centrifuges (RPM and Time). e. Weighing Balances and Blood Weighing Scales/Mixers. f. Volumetric Glassware.",
        references: (
            <ul className="space-y-4">
                <li className="flex gap-4">
                    <span className="font-bold min-w-[30px]">3.1</span>
                    <span>MS ISO 15189:2022 Medical Laboratories — Requirements for Quality and Competence.</span>
                </li>
                <li className="flex gap-4">
                    <span className="font-bold min-w-[30px]">3.2</span>
                    <span>HSAH/JPT/QP12 Management of Equipment.</span>
                </li>
                <li className="flex gap-4">
                    <span className="font-bold min-w-[30px]">3.3</span>
                    <span>Manufacturer’s Instruction Manuals for respective equipment.</span>
                </li>
                 <li className="flex gap-4">
                    <span className="font-bold min-w-[30px]">3.4</span>
                    <span>Calibration ISO 15189 Requirement (IKN 2018).</span>
                </li>
            </ul>
        ),
        definitions: (
             <dl className="space-y-4">
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.1 Calibration:</dt>
                    <dd>A set of operations that establish, under specified conditions, the relationship between values of quantities indicated by a measuring instrument and the corresponding values realized by standards.</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.2 Verification (In-house Check):</dt>
                    <dd>Confirmation, through the provision of objective evidence, that specified requirements have been fulfilled.</dd>
                </div>
                <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.3 Correction Factor:</dt>
                    <dd>A value added algebraically to the uncorrected result of a measurement to compensate for systematic error.</dd>
                </div>
                 <div className="flex gap-4">
                    <dt className="font-bold min-w-[200px]">4.4 SI Units:</dt>
                    <dd>International System of Units.</dd>
                </div>
             </dl>
        ),
        amendments: [
            {
                no: "00", version: "01", date: "28/01/2026",
                details: "First Issue for Jabatan Perubatan Transfusi"
            }
        ],
        records: [
            { no: "6.1", type: "Calibration Certificates (External)", fileNo: "HSAH/JPT/FE8.0", location: "Admin Room", retention: "Lifetime of Instrument" },
            { no: "6.2", type: "Pipette Verification Records", fileNo: "HSAH/JPT/FE14.1", location: "Laboratory", retention: "2 Years" },
            { no: "6.3", type: "Thermometer Verification Records", fileNo: "HSAH/JPT/FE14.2", location: "Laboratory", retention: "2 Years" },
            { no: "6.4", type: "Timer/Centrifuge Check Records", fileNo: "HSAH/JPT/FE14.3", location: "Laboratory", retention: "2 Years" },
            { no: "6.5", type: "Balance Calibration Records", fileNo: "HSAH/JPT/FE14.4", location: "Laboratory", retention: "2 Years" },
        ],
        distributionList: defaultDistribution,
        flowchart: (
             <div className="flex flex-col items-center gap-4 text-sm border p-8 border-gray-300 bg-gray-50 rounded">
                <div className="border-2 border-black px-6 py-2 rounded-full font-bold bg-white text-center">Start</div>
                <div className="h-6 w-0.5 bg-black"></div>
                <div className="border-2 border-black px-6 py-2 bg-white text-center">Identify Equipment due for calibration/verification</div>
                 <div className="h-6 w-0.5 bg-black"></div>
                 <div className="border-2 border-black px-6 py-2 bg-white text-center">
                    <p className="font-bold">Determine Method:</p>
                    <ul className="text-left list-disc list-inside mt-2 text-xs">
                        <li>External: Send to ISO 17025 accredited provider</li>
                        <li>In-House: Perform verification using reference standards</li>
                    </ul>
                 </div>
                 <div className="h-6 w-0.5 bg-black"></div>
                 <div className="border-2 border-black px-6 py-2 bg-white text-center">Evaluate Results (Accuracy, Precision, Tolerance)</div>
                <div className="h-6 w-0.5 bg-black"></div>
                <div className="border-2 border-black px-4 py-4 transform rotate-45 bg-white w-32 h-32 flex items-center justify-center shadow-sm">
                    <div className="transform -rotate-45 font-bold text-center">
                        <p>Pass?</p>
                    </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-4 mt-2 max-w-lg">
                    <div className="flex flex-col items-center">
                        <div className="font-bold text-green-600 mb-1">YES</div>
                        <div className="border-2 border-black px-4 py-2 bg-green-50 text-center w-full h-full flex items-center justify-center">Update Green Label, Record Data, Return to Use</div>
                    </div>
                    <div className="flex flex-col items-center">
                         <div className="font-bold text-red-600 mb-1">NO</div>
                         <div className="border-2 border-black px-4 py-2 bg-red-50 text-center w-full h-full flex items-center justify-center">Apply Red Label ("Out of Service"), Initiate NCR, Root Cause Analysis</div>
                    </div>
                </div>
                <div className="h-6 w-0.5 bg-black mt-2"></div>
                <div className="border-2 border-black px-6 py-2 rounded-full font-bold bg-white text-center">End</div>
            </div>
        )
    },
    procedures: [
        {
            no: '5.1',
            activity: (
                <>
                 <p className="font-bold mb-2">General Requirements</p>
                 <ol className="list-[lower-alpha] list-inside space-y-2">
                     <li><strong>Master List:</strong> Maintain a Master List of measuring equipment requiring calibration/verification.</li>
                     <li><strong>Schedule:</strong> Prepare an Annual Calibration/Verification Schedule.</li>
                     <li><strong>Traceability:</strong> Ensure all external calibration is performed by an accredited laboratory (ISO 17025) or provides traceability to national/international standards (SI Units).</li>
                 </ol>
                </>
            ),
            responsibility: 'SO / Asset Coordinator'
        },
        {
            no: '5.2',
            activity: (
                <>
                 <p className="font-bold mb-2">External Calibration</p>
                 <ol className="list-[lower-alpha] list-inside space-y-2">
                     <li>Send critical equipment (e.g., Reference Thermometer, Reference Weights, Tachometer) for external calibration annually or as defined by the manufacturer.</li>
                     <li><strong>Review Certificate:</strong> Upon return, review the calibration certificate for:
                         <ul className="list-[lower-roman] list-inside ml-4">
                             <li>Traceability statement.</li>
                             <li>Measurement uncertainty.</li>
                             <li>Correction factors.</li>
                         </ul>
                     </li>
                     <li>Update the equipment status label (e.g., "Calibrated", "Correction Factor Applied").</li>
                 </ol>
                </>
            ),
            responsibility: 'SO / Asset Coordinator'
        },
        {
            no: '5.3',
            activity: (
                <>
                 <p className="font-bold mb-2">In-House Verification (Performance Checks)</p>
                 
                 <div className="mb-4">
                     <p className="font-bold underline">5.3.1 Automatic Pipettes</p>
                     <ul className="list-disc list-inside ml-2 space-y-1">
                        <li><strong>Method:</strong> Gravimetric (weighing distilled water).</li>
                        <li><strong>Frequency:</strong> Every 6 months.</li>
                        <li><strong>Procedure:</strong>
                             <ul className="list-[lower-roman] list-inside ml-4">
                                <li>Use a calibrated analytical balance and distilled water.</li>
                                <li>Perform 10 measurements at nominal volume.</li>
                                <li>Calculate Mean, Accuracy (%), and CV (%).</li>
                             </ul>
                        </li>
                        <li><strong>Criteria:</strong> Must be within manufacturer's specs (e.g., ±2% Accuracy).</li>
                     </ul>
                 </div>

                 <div className="mb-4">
                     <p className="font-bold underline">5.3.2 Thermometers (Working Thermometers)</p>
                     <ul className="list-disc list-inside ml-2 space-y-1">
                        <li><strong>Method:</strong> Comparison against a Calibrated Reference Thermometer.</li>
                        <li><strong>Frequency:</strong> Every 6 months.</li>
                        <li><strong>Procedure:</strong> Place both probes in a stable medium (water bath or glycol) and record readings after stabilization.</li>
                        <li><strong>Criteria:</strong> Deviation must be within ±1.0°C (or per unit requirements). If deviation exists, apply correction factor or replace.</li>
                     </ul>
                 </div>

                  <div>
                     <p className="font-bold underline">5.3.3 Weighing Balances & Blood Mixers</p>
                     <ul className="list-disc list-inside ml-2 space-y-1">
                        <li><strong>Method:</strong> Standard Weights Check.</li>
                        <li><strong>Frequency:</strong> Daily/Monthly (depending on usage).</li>
                        <li><strong>Procedure:</strong> Place a known standard weight (e.g., 500g for blood mixer) and verify display.</li>
                        <li><strong>Criteria:</strong> Must fall within defined tolerance (e.g., ±1g).</li>
                     </ul>
                 </div>
                </>
            ),
            responsibility: 'Designated Staff (JTMP)'
        },
        {
            no: '5.4',
            activity: (
                <>
                 <p className="font-bold mb-2">Handling Out-of-Specification Equipment</p>
                 <ol className="list-[lower-alpha] list-inside space-y-2">
                     <li>If equipment fails verification:
                        <ul className="list-[lower-roman] list-inside ml-4">
                             <li>Label as "DO NOT USE" or "OUT OF SERVICE".</li>
                             <li>Review impact on previous tests (Patient Impact Assessment).</li>
                             <li>Send for repair or external calibration.</li>
                             <li>Re-verify before returning to service.</li>
                         </ul>
                     </li>
                 </ol>
                </>
            ),
            responsibility: 'SO / HOD'
        },
        {
            no: '5.5',
            activity: (
                <>
                 <p className="font-bold mb-2">Labeling</p>
                 <p>All equipment must have a status label indicating:</p>
                 <ol className="list-[lower-alpha] list-inside space-y-2 mt-2">
                     <li>Date of last calibration/verification.</li>
                     <li>Date due.</li>
                     <li>Name of person performing the check.</li>
                     <li>Correction factor (if applicable).</li>
                 </ol>
                </>
            ),
            responsibility: 'Asset Coordinator'
        }
    ]
  },

  // Generate placeholders for the rest
  ...Array.from({ length: 30 }, (_, i) => i + 1)
    .filter(n => n !== 15 && n !== 12 && n !== 13 && n !== 14 && n !== 16 && n !== 4 && n !== 5) // Exclude defined QPs
    .map(n => createPlaceholderQP(n))
].sort((a, b) => {
    // Custom sort to handle WI correctly in order if needed, or just by doc number string
    const getNum = (str: string) => {
        const num = str.replace(/[^0-9]/g, '');
        return parseInt(num) || 999;
    }
    return getNum(a.docNo) - getNum(b.docNo);
});