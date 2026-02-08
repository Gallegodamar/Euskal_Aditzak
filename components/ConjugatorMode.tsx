
import React, { useState, useMemo } from 'react';
import { VERB_DATA, TENSE_NAMES, SUBJECT_FULL_NAMES } from '../constants';

type CaseType = 'nor' | 'nor-nork' | 'nor-nori' | 'nor-nori-nork';

const ConjugatorMode: React.FC = () => {
  const [caseType, setCaseType] = useState<CaseType>('nor');
  const [tense, setTense] = useState<string>('oraina');
  
  // Arguments
  const [nor, setNor] = useState<string>('ni');
  const [nork, setNork] = useState<string>('nik');
  const [nori, setNori] = useState<string>('niri');
  const [objNum, setObjNum] = useState<'singularra' | 'plurala'>('singularra');

  const subjectsNor = ["ni", "hi", "hura", "gu", "zu", "zuek", "haiek"];
  const subjectsNork = ["nik", "hik", "hark", "guk", "zuk", "zuek", "haiek"];
  const indirectNori = ["niri", "hiri", "hari", "guri", "zuri", "zuei", "haiei"];

  // Available tenses based on case
  const availableTenses = useMemo(() => {
    let source: any = {};
    if (caseType === 'nor') source = VERB_DATA.izan.nor;
    if (caseType === 'nor-nork') source = VERB_DATA.ukan["nor-nork"];
    if (caseType === 'nor-nori') source = VERB_DATA.izan["nor-nori"];
    if (caseType === 'nor-nori-nork') source = VERB_DATA.ukan["nor-nori-nork"];
    
    return Object.keys(source);
  }, [caseType]);

  // Ensure selected tense is valid when case changes
  React.useEffect(() => {
    if (!availableTenses.includes(tense)) {
      setTense(availableTenses[0] || 'oraina');
    }
  }, [caseType, availableTenses]);

  const result = useMemo(() => {
    try {
      if (caseType === 'nor') {
        return (VERB_DATA.izan.nor[tense] as any)?.[nor];
      }
      if (caseType === 'nor-nork') {
        const data = VERB_DATA.ukan["nor-nork"][tense];
        // Now baldintza also uses matrix logic for specific persons
        if (tense === 'oraina' || tense === 'iragana' || tense === 'baldintza') {
          return (data as any)?.[nor]?.[nork];
        } else {
          return (data as any)?.[objNum]?.[nork];
        }
      }
      if (caseType === 'nor-nori') {
        return (VERB_DATA.izan["nor-nori"][tense] as any)?.[nor]?.[nori];
      }
      if (caseType === 'nor-nori-nork') {
        const data = VERB_DATA.ukan["nor-nori-nork"][tense];
        return (data as any)?.[objNum]?.[nori]?.[nork];
      }
    } catch (e) {
      return null;
    }
    return null;
  }, [caseType, tense, nor, nork, nori, objNum]);

  const getCaseColor = () => {
    switch (caseType) {
      case 'nor-nork': return 'blue';
      case 'nor-nori': return 'orange';
      case 'nor-nori-nork': return 'purple';
      default: return 'emerald';
    }
  };

  const color = getCaseColor();

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in duration-500 pt-2">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Selectors */}
        <div className="lg:col-span-2 space-y-4">
          {/* 1. Case Type */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">1. Kasua</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['nor', 'nor-nork', 'nor-nori', 'nor-nori-nork'] as CaseType[]).map(c => (
                <button
                  key={c}
                  onClick={() => setCaseType(c)}
                  className={`py-2 rounded-xl text-[11px] font-bold transition-all border-2 ${caseType === c ? `border-${getCaseColor()}-600 bg-${getCaseColor()}-50 text-${getCaseColor()}-700 shadow-sm` : 'border-gray-50 bg-gray-50 text-gray-400 hover:border-gray-100'}`}
                >
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
          </section>

          {/* 2. Tense */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">2. Denbora / Modua</h3>
            <div className="relative">
              <select
                value={tense}
                onChange={(e) => setTense(e.target.value)}
                className={`w-full p-2.5 rounded-xl text-[11px] font-bold appearance-none bg-gray-50 border-2 border-transparent focus:border-${color}-600 focus:bg-white focus:outline-none transition-all text-gray-700 cursor-pointer shadow-inner`}
              >
                {availableTenses.map(t => (
                  <option key={t} value={t}>
                    {TENSE_NAMES[t]?.toUpperCase() || t.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <i className={`fas fa-chevron-down text-gray-400 text-[10px]`}></i>
              </div>
            </div>
          </section>

          {/* 3. Arguments */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-5">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">3. Argumentuak</h3>
            
            {/* NOR Subject selector (for NOR, NOR-NORK, NOR-NORI) */}
            {['nor', 'nor-nork', 'nor-nori'].includes(caseType) && (
              <div>
                <p className="text-[10px] font-bold text-gray-500 mb-2 uppercase">NOR ({caseType === 'nor-nork' ? 'Objektua' : 'Subjektua'})</p>
                <div className="flex flex-wrap gap-1.5">
                  {subjectsNor.map(s => (
                    <button
                      key={s}
                      onClick={() => setNor(s)}
                      className={`w-10 h-8 rounded-lg text-[10px] font-bold transition-all ${nor === s ? `bg-${color}-100 text-${color}-700 border-2 border-${color}-600` : 'bg-gray-50 text-gray-400 border-2 border-transparent hover:border-gray-200'}`}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* NORI selector (for NOR-NORI, NOR-NORI-NORK) */}
            {['nor-nori', 'nor-nori-nork'].includes(caseType) && (
              <div>
                <p className="text-[10px] font-bold text-gray-500 mb-2 uppercase">NORI (Indirektua)</p>
                <div className="flex flex-wrap gap-1.5">
                  {indirectNori.map(s => (
                    <button
                      key={s}
                      onClick={() => setNori(s)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${nori === s ? `bg-${color}-100 text-${color}-700 border-2 border-${color}-600` : 'bg-gray-50 text-gray-400 border-2 border-transparent hover:border-gray-200'}`}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* NORK selector (for NOR-NORK, NOR-NORI-NORK) */}
            {['nor-nork', 'nor-nori-nork'].includes(caseType) && (
              <div>
                <p className="text-[10px] font-bold text-gray-500 mb-2 uppercase">NORK (Subjektu aktiboa)</p>
                <div className="flex flex-wrap gap-1.5">
                  {subjectsNork.map(s => (
                    <button
                      key={s}
                      onClick={() => setNork(s)}
                      className={`w-10 h-8 rounded-lg text-[10px] font-bold transition-all ${nork === s ? `bg-${color}-100 text-${color}-700 border-2 border-${color}-600` : 'bg-gray-50 text-gray-400 border-2 border-transparent hover:border-gray-200'}`}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Obj Number (for complex tenses or N3K) */}
            {((caseType === 'nor-nork' && !['oraina', 'iragana', 'baldintza'].includes(tense)) || caseType === 'nor-nori-nork') && (
              <div>
                <p className="text-[10px] font-bold text-gray-500 mb-2 uppercase">NOR (Zenbakia)</p>
                <div className="flex gap-1.5">
                  {(['singularra', 'plurala'] as const).map(n => (
                    <button
                      key={n}
                      onClick={() => setObjNum(n)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${objNum === n ? `bg-${color}-100 text-${color}-700 border-2 border-${color}-600` : 'bg-gray-50 text-gray-400 border-2 border-transparent hover:border-gray-200'}`}
                    >
                      {n === 'singularra' ? 'HURA' : 'HAIEK'}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right: Result Display */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className={`bg-white rounded-2xl shadow-xl border-4 border-${color}-600 overflow-hidden`}>
              <div className={`bg-${color}-600 p-2.5 text-center text-white`}>
                <span className="text-[9px] font-black uppercase tracking-widest opacity-80">Emaitza</span>
              </div>
              <div className="p-5 text-center space-y-4">
                <div className="flex justify-center items-center gap-3 text-gray-400 text-[8px] font-black uppercase tracking-widest">
                  <span>{caseType}</span>
                  <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                  <span>{TENSE_NAMES[tense] || tense}</span>
                </div>
                
                <div className="py-2">
                  {result ? (
                    <h4 className={`text-3xl sm:text-4xl font-black text-${color}-700 basque-font break-words`}>
                      {result}
                    </h4>
                  ) : (
                    <div className="text-gray-300 italic py-2 text-sm">
                      Ez dago formarik
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-center items-center gap-1.5 text-gray-500 text-[10px] font-bold">
                    <span className="bg-gray-50 px-1.5 py-0.5 rounded capitalize">{caseType === 'nor-nori-nork' || caseType === 'nor-nork' ? nork : nor}</span>
                    <i className="fas fa-arrow-right text-[8px] opacity-30"></i>
                    {caseType.includes('nori') && <span className="bg-gray-50 px-1.5 py-0.5 rounded capitalize">{nori}</span>}
                    {caseType !== 'nor' && <span className="bg-gray-50 px-1.5 py-0.5 rounded capitalize">{caseType === 'nor-nori-nork' ? (objNum === 'singularra' ? 'hura' : 'haiek') : nor}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-gray-900 text-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 mb-1.5">
                    <i className="fas fa-info-circle text-emerald-400 text-xs"></i>
                    <h5 className="font-bold text-[11px]">Nola eraiki?</h5>
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                    Aukeratu pertsona bakoitzari dagokion adizkia. <strong>NOR-NORK</strong> kasuan "Nork" ekintza egiten duena da.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConjugatorMode;
