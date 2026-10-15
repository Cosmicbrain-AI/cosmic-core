/** Proposed field-pilot definitions. These are reporting requirements, not measured results. */
export const pilotMetrics = [
  {
    id: "uptime",
    name: "Uptime / robot availability",
    definition: "Available robot hours ÷ scheduled robot hours.",
    reporting:
      "Fix the readiness criteria and schedule before the trial. Break out charging, repair, software faults and network downtime within that window. This measures the robot, not facility uptime.",
  },
  {
    id: "round-completion",
    name: "Round completion",
    definition: "Scheduled racks inspected with required evidence ÷ racks scheduled, per round.",
    reporting:
      "Retain the scheduled rack list. Record completed, blocked and skipped racks with reason codes; a repeat visit does not add another completed rack.",
  },
  {
    id: "findings",
    name: "Findings",
    definition:
      "Anomalies raised, confirmed by site staff, rejected as false positives, and pending review.",
    reporting:
      "Attach rack/asset ID, timestamp and image evidence. Retain the site adjudicator and disposition. A raised alert is not a confirmed fault.",
  },
  {
    id: "audit-accuracy",
    name: "Audit accuracy",
    definition: "Exact asset-tag matches ÷ tags in a hand-checked sample.",
    reporting:
      "Register the sample before scoring. Include unread and misread tags in the denominator; report each separately. Reconcile rack position and serial number where in scope.",
  },
  {
    id: "parts-run-time",
    name: "Parts run time",
    definition: "Elapsed time from request receipt to verified part handoff at the target rack.",
    reporting:
      "Include dispatch/acceptance delay, queue, pickup, transit and handoff time. Report p50/p95 for completed runs alongside outstanding, aborted and failed requests.",
  },
  {
    id: "intervention-rate",
    name: "Intervention rate",
    definition: "Task attempts with an operator takeover ÷ all initiated attempts.",
    reporting:
      "Keep aborted and failed attempts. Log takeover reason, control ownership and recovery outcome. Report planned manual steps separately from unplanned interventions.",
  },
  {
    id: "operator-minutes",
    name: "Operator minutes per task",
    definition: "Total operator control minutes ÷ completed tasks.",
    reporting:
      "Sum all operators, failed-attempt control time and recovery within the reporting window. This is a control-time cost driver; report passive supervision and reset labor separately. Zero completions means undefined, not zero.",
  },
  {
    id: "incidents",
    name: "Incidents",
    definition:
      "Equipment/person contacts, near misses, person-triggered stops and emergency stops.",
    reporting:
      "Separate event categories and severity. Retain task, location, recovery and disposition, with operating hours and attempt counts as exposure. Review stops individually.",
  },
  {
    id: "network-health",
    name: "Network health",
    definition:
      "Robot ↔ operator RTT p50/p95/p99, jitter, packet loss, failovers and degraded-mode minutes.",
    reporting:
      "Declare endpoints, probe cadence, sample count and jitter method. Report sent/lost probes separately from delivered-probe latency; tie outages and failovers to mission IDs. Set thresholds with the site.",
  },
] as const;

export const pilotReferences = [
  {
    label: "NIST · HRI measurement",
    href: "https://www.nist.gov/publications/towards-effective-interface-designs-collaborative-hri-manufacturing-metrics-and",
  },
  {
    label: "IETF · RTT, loss & delay variation",
    href: "https://www.rfc-editor.org/rfc/rfc9439.html",
  },
  {
    label: "DMTF · Redfish asset schema",
    href: "https://www.dmtf.org/sites/default/files/standards/documents/DSP2046_2026.2.pdf",
  },
  {
    label: "ASHRAE · Thermal conditions",
    href: "https://handbook.ashrae.org/Handbooks/A23/IP/A23_Ch20/a23_ch20_ip.aspx",
  },
  {
    label: "NVIDIA · OEM service preparation",
    href: "https://docs.nvidia.com/dgx/dgxh100-service-manual/motherboard-tray-common.html",
  },
  {
    label: "OSHA · Robot system assessment",
    href: "https://www.osha.gov/otm/section-4-safety-hazards/chapter-4",
  },
] as const;
