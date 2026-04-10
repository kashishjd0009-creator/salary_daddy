const EMAIL_MARKER = "## EMAIL DRAFT"

export type ParsedOutput = {
  scriptSection: string
  emailSection: string
  emailSubject: string | null
  emailBody: string
}

export function parseGeneratedOutput(
  full: string,
  generateScript: boolean,
  generateEmail: boolean
): ParsedOutput {
  const idx = full.indexOf(EMAIL_MARKER)
  let scriptSection = ""
  let emailSection = ""

  if (generateScript && generateEmail && idx >= 0) {
    scriptSection = full.slice(0, idx).trim()
    emailSection = full.slice(idx).trim()
  } else if (generateEmail && !generateScript) {
    emailSection = full.trim()
  } else {
    scriptSection = full.trim()
  }

  const subjectMatch = emailSection.match(/^SUBJECT:\s*(.+)$/im)
  const emailSubject = subjectMatch ? subjectMatch[1].trim() : null

  const bodyIdx = emailSection.search(/^BODY:\s*/im)
  const emailBody =
    bodyIdx >= 0
      ? emailSection.slice(bodyIdx).replace(/^BODY:\s*/i, "").trim()
      : emailSection.replace(/^## EMAIL DRAFT\s*/i, "").trim()

  return {
    scriptSection,
    emailSection,
    emailSubject,
    emailBody,
  }
}
