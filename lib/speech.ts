export function mandarinVoice<
  T extends Pick<SpeechSynthesisVoice, "lang" | "localService">,
>(voices: T[]) {
  const local = voices.filter((voice) => voice.localService)
  const locale = (voice: T) => voice.lang.toLowerCase().replaceAll("_", "-")
  return (
    local.find((voice) => /^zh-(?:hans-)?cn$/.test(locale(voice))) ??
    local.find((voice) =>
      /^(?:cmn(?:-|$)|zh-(?:cmn(?:-|$)|(?:hans-|hant-)?(?:cn|sg|tw)(?:-|$)|hans$))/.test(
        locale(voice)
      )
    )
  )
}
