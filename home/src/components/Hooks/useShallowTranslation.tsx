import React, { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import getT from 'next-translate/getT'

export default function useShallowTranslation(ns: string) {
  const mounted = useRef(false)
  const { locale } = useRouter()
  const { lang, t } = useTranslation(ns)
  const [_t, setT] = useState(() => t)
  const [_lang, setLang] = useState(lang)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    getT(locale, ns).then((newT) => {
      setT(() => newT)
      setLang(locale as any)
    })
  }, [lang, locale, ns])

  return { t: _t, lang: _lang }
}