
import React, { useState } from 'react';
import { VERB_DATA, TENSE_NAMES, SUBJECT_FULL_NAMES } from '../constants';

const StudyMode: React.FC = () => {
  const [selectedVerb, setSelectedVerb] = useState<'izan' | 'ukan' | 'nor-nori' | 'nor-nori-nork'>('izan');
  
  // NOR (Izan) states
  const [selectedIzanTense, setSelectedIzanTense] = useState<'oraina' | 'iragana' | 'baldintza' | 'hipotetikoa_oraina' | 'hipotetikoa_iragana' | 'ahalera_oraina' | 'ahalera_iragana' | 'ahalera_alegiazkoa' | 'subjuntiboa_oraina' | 'subjuntiboa_iragana'>('oraina');

  // NOR-NORK (Ukan) states
  const [selectedUkanTense, setSelectedUkanTense] = useState<'oraina' | 'iragana' | 'baldintza' | 'hipotetikoa_oraina' | 'hipotetikoa_iragana' | 'ahalera_oraina' | 'ahalera_iragana' | 'ahalera_alegiazkoa' | 'subjuntiboa_oraina' | 'subjuntiboa_iragana'>('oraina');
  const [selectedUkanNor, setSelectedUkanNor] = useState<string>('hura');
  
  // NOR-NORI states
  const [selectedNorSubject, setSelectedNorSubject] = useState<string>('hura');
  const [selectedNorNoriTense, setSelectedNorNoriTense] = useState<'oraina' | 'iragana' | 'baldintza' | 'hipotetikoa' | 'hipotetikoa_iragana' | 'ahalera_oraina'>('oraina');

  // NOR-NORI-NORK states
  const [selectedN3Tense, setSelectedN3Tense] = useState<'oraina' | 'iragana' | 'baldintza' | 'hipotetikoa' | 'hipotetikoa_iragana' | 'ahalera' | 'ahalera_iragana' | 'ahalera_alegiazkoa' | 'subjuntiboa_oraina' | 'subjuntiboa_iragana'>('oraina');
  const [selectedNori, setSelectedNori] = useState<string>('hari');

  const subjectsIzan = ["ni", "hi", "hura", "gu", "zu", "zuek", "haiek"];
  const subjectsUkan = ["nik", "hik", "hark", "guk", "zuk", "zuek", "haiek"];
  const noriOptions = ["niri", "hiri", "hari", "guri", "zuri", "zuei", "haiei"];

  const getActiveColor = () => {
    if (selectedVerb === 'izan') return 'emerald';
    if (selectedVerb === 'nor-nori') return 'orange';
    if (selectedVerb === 'ukan') return 'blue';
    return 'purple';
  };

  const activeColor = getActiveColor();

  const renderIzan = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-emerald-200 overflow-hidden max-w-4xl mx-auto">
      <div className="bg-emerald-600 px-6 py-6 text-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-left">
          <h3 className="font-black text-2xl uppercase tracking-tighter">IZAN - NOR</h3>
          <p className="text-emerald-100 text-[10px] opacity-80 uppercase font-bold tracking-widest mt-1">Aditz Intrantsitiboak</p>
        </div>
        <div className="relative w-full md:w-64">
          <select
            value={selectedIzanTense}
            onChange={(e) => setSelectedIzanTense(e.target.value as any)}
            className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-2.5 text-xs font-bold text-white focus:bg-white focus:text-emerald-700 focus:outline-none transition-all appearance-none cursor-pointer"
          >
            {['oraina', 'iragana', 'baldintza', 'hipotetikoa_oraina', 'hipotetikoa_iragana', 'ahalera_oraina', 'ahalera_iragana', 'ahalera_alegiazkoa', 'subjuntiboa_oraina', 'subjuntiboa_iragana'].map(t => (
              <option key={t} value={t} className="bg-white text-gray-800">
                {TENSE_NAMES[t]?.toUpperCase() || t.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <i className="fas fa-chevron-down text-white/50 text-[10px]"></i>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-emerald-50 text-emerald-900 text-[10px] uppercase tracking-widest">
              <th className="px-6 py-4">NOR (Subjektua)</th>
              <th className="px-6 py-4">Adizkia</th>
            </tr>
          </thead>
          <tbody>
            {subjectsIzan.map((subject, idx) => (
              <tr key={subject} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-emerald-50/20'} border-b border-emerald-50`}>
                <td className="px-6 py-4 text-sm font-black text-gray-800">{subject.toUpperCase()}</td>
                <td className="px-6 py-4 text-emerald-600 font-bold text-lg">{(VERB_DATA.izan.nor[selectedIzanTense] as any)[subject]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUkan = () => {
    // Standard tenses that use the full matrix (NOR-NORK for all persons)
    const isFullMatrixTense = ['oraina', 'iragana', 'baldintza'].includes(selectedUkanTense);
    
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden max-w-4xl mx-auto">
        <div className="bg-blue-600 px-6 py-6 text-white flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-left">
            <h3 className="font-black text-2xl uppercase tracking-tighter">UKAN - NOR-NORK</h3>
            <p className="text-blue-100 text-[10px] opacity-80 uppercase font-bold tracking-widest mt-1">Aditz Trantsitiboak</p>
          </div>
          <div className="relative w-full md:w-64">
            <select
              value={selectedUkanTense}
              onChange={(e) => setSelectedUkanTense(e.target.value as any)}
              className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-2.5 text-xs font-bold text-white focus:bg-white focus:text-blue-700 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              {['oraina', 'iragana', 'baldintza', 'hipotetikoa_oraina', 'hipotetikoa_iragana', 'ahalera_oraina', 'ahalera_iragana', 'ahalera_alegiazkoa', 'subjuntiboa_oraina', 'subjuntiboa_iragana'].map(t => (
                <option key={t} value={t} className="bg-white text-gray-800">
                  {TENSE_NAMES[t]?.toUpperCase() || t.replace('_', ' ').toUpperCase()}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <i className="fas fa-chevron-down text-white/50 text-[10px]"></i>
            </div>
          </div>
        </div>

        {isFullMatrixTense && (
          <div className="p-6 border-b border-blue-100 bg-blue-50/30">
            <p className="text-[10px] font-bold text-blue-800 uppercase mb-3 text-center">NOR (Objektua)</p>
            <div className="flex flex-wrap justify-center gap-2">
              {subjectsIzan.map(sub => (
                <button
                  key={sub}
                  onClick={() => setSelectedUkanNor(sub)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border-2 ${
                    selectedUkanNor === sub 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                      : 'bg-white border-blue-100 text-blue-600 hover:border-blue-300'
                  }`}
                >
                  {sub.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-blue-50 text-blue-800 text-[10px] uppercase tracking-wider">
                <th className="px-6 py-3">Nork (Subjektua)</th>
                {isFullMatrixTense ? (
                  <th className="px-6 py-3">Adizkia ({selectedUkanNor.toUpperCase()})</th>
                ) : (
                  <>
                    <th className="px-6 py-3">Singularra (hark)</th>
                    <th className="px-6 py-3">Plurala (haiek)</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {subjectsUkan.map((nork, idx) => {
                if (isFullMatrixTense) {
                  const form = (VERB_DATA.ukan["nor-nork"][selectedUkanTense] as any)[selectedUkanNor]?.[nork];
                  if (!form) return (
                    <tr key={nork} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-b border-gray-50`}>
                      <td className="px-6 py-4 text-sm font-black text-gray-800">{nork.toUpperCase()}</td>
                      <td className="px-6 py-4 text-gray-300 italic text-sm">---</td>
                    </tr>
                  );
                  return (
                    <tr key={nork} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-b border-gray-50`}>
                      <td className="px-6 py-4 text-sm font-black text-gray-800">{nork.toUpperCase()}</td>
                      <td className="px-6 py-4 text-blue-600 font-bold text-lg">{form}</td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={nork} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-b border-gray-50`}>
                      <td className="px-6 py-4 text-sm font-black text-gray-800">{nork.toUpperCase()}</td>
                      <td className="px-6 py-4 text-blue-600 font-bold text-lg">{(VERB_DATA.ukan["nor-nork"][selectedUkanTense].singularra as any)[nork]}</td>
                      <td className="px-6 py-4 text-blue-500 font-bold text-lg">{(VERB_DATA.ukan["nor-nork"][selectedUkanTense].plurala as any)[nork]}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderNorNori = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-orange-200 overflow-hidden max-w-4xl mx-auto">
      <div className="bg-orange-600 px-6 py-6 text-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-left">
          <h3 className="font-black text-2xl uppercase tracking-tighter">NOR-NORI</h3>
          <p className="text-orange-100 text-[10px] opacity-80 uppercase font-bold tracking-widest mt-1 italic">Izan aditzaren forma bitarrak</p>
        </div>
        <div className="relative w-full md:w-64">
          <select
            value={selectedNorNoriTense}
            onChange={(e) => setSelectedNorNoriTense(e.target.value as any)}
            className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-2.5 text-xs font-bold text-white focus:bg-white focus:text-orange-700 focus:outline-none transition-all appearance-none cursor-pointer"
          >
            {['oraina', 'iragana', 'baldintza', 'hipotetikoa', 'hipotetikoa_iragana', 'ahalera_oraina'].map(t => (
              <option key={t} value={t} className="bg-white text-gray-800">
                {TENSE_NAMES[t]?.toUpperCase() || t.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <i className="fas fa-chevron-down text-white/50 text-[10px]"></i>
          </div>
        </div>
      </div>
      
      <div className="p-6 border-b border-orange-100 bg-orange-50/30">
        <p className="text-[10px] font-bold text-orange-800 uppercase mb-3 text-center">NOR (Subjektua)</p>
        <div className="flex flex-wrap justify-center gap-2">
          {subjectsIzan.map(sub => (
            <button
              key={sub}
              onClick={() => setSelectedNorSubject(sub)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border-2 ${
                selectedNorSubject === sub 
                  ? 'bg-orange-600 border-orange-600 text-white shadow-md' 
                  : 'bg-white border-orange-100 text-orange-600 hover:border-orange-300'
              }`}
            >
              {sub.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-orange-100/50 text-orange-900 text-[10px] uppercase tracking-widest">
              <th className="px-6 py-4">Nori (Objektua)</th>
              <th className="px-6 py-4">Adizkia</th>
            </tr>
          </thead>
          <tbody>
            {noriOptions.map((nori, idx) => {
              const form = (VERB_DATA.izan["nor-nori"][selectedNorNoriTense] as any)[selectedNorSubject]?.[nori];
              
              return (
                <tr key={nori} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-orange-50/20'} border-b border-orange-50`}>
                  <td className="px-6 py-4 text-sm font-black text-gray-800">{SUBJECT_FULL_NAMES[nori]}</td>
                  <td className="px-6 py-4 text-orange-700 font-bold text-lg">{form || '---'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderNorNoriNork = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-purple-200 overflow-hidden max-w-4xl mx-auto">
      <div className="bg-purple-700 px-6 py-6 text-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-left">
          <h3 className="font-black text-2xl uppercase tracking-tighter">NOR-NORI-NORK</h3>
          <p className="text-purple-100 text-[10px] opacity-80 uppercase font-bold tracking-widest mt-1">Aditz Hiruargunekoak</p>
        </div>
        <div className="relative w-full md:w-64">
          <select
            value={selectedN3Tense}
            onChange={(e) => setSelectedN3Tense(e.target.value as any)}
            className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-2.5 text-xs font-bold text-white focus:bg-white focus:text-purple-700 focus:outline-none transition-all appearance-none cursor-pointer"
          >
            {['oraina', 'iragana', 'baldintza', 'hipotetikoa', 'hipotetikoa_iragana', 'ahalera', 'ahalera_iragana', 'ahalera_alegiazkoa', 'subjuntiboa_oraina', 'subjuntiboa_iragana'].map(t => (
              <option key={t} value={t} className="bg-white text-gray-800">
                {TENSE_NAMES[t]?.toUpperCase() || t.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <i className="fas fa-chevron-down text-white/50 text-[10px]"></i>
          </div>
        </div>
      </div>
      
      <div className="p-6 border-b border-purple-100 bg-purple-50/30">
        <p className="text-[10px] font-bold text-purple-800 uppercase mb-3 text-center">NORI (Indirektua)</p>
        <div className="flex flex-wrap justify-center gap-2">
          {noriOptions.map(nori => (
            <button
              key={nori}
              onClick={() => setSelectedNori(nori)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border-2 ${
                selectedNori === nori 
                  ? 'bg-purple-600 border-purple-600 text-white shadow-md' 
                  : 'bg-white border-purple-100 text-purple-600 hover:border-purple-300'
              }`}
            >
              {SUBJECT_FULL_NAMES[nori]}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-purple-100/50 text-purple-900 text-[10px] uppercase tracking-widest">
              <th className="px-6 py-4">Nork (Subjektua)</th>
              <th className="px-6 py-4">Singularra (hark)</th>
              <th className="px-6 py-4">Plurala (haiek)</th>
            </tr>
          </thead>
          <tbody>
            {subjectsUkan.map((nork, idx) => {
              const singVal = (VERB_DATA.ukan["nor-nori-nork"][selectedN3Tense].singularra as any)[selectedNori][nork];
              const plurVal = (VERB_DATA.ukan["nor-nori-nork"][selectedN3Tense].plurala as any)[selectedNori][nork];
              
              if (!singVal && !plurVal) return null;

              return (
                <tr key={nork} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-purple-50/20'} border-b border-purple-50`}>
                  <td className="px-6 py-4 text-sm font-black text-gray-800">{nork.toUpperCase()}</td>
                  <td className="px-6 py-4 text-purple-700 font-bold text-lg">{singVal || '---'}</td>
                  <td className="px-6 py-4 text-purple-500 font-bold text-lg">{plurVal || '---'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center mb-8 max-w-xs mx-auto">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block text-center">Aukeratu Kasua</label>
        <div className="relative">
          <select 
              value={selectedVerb}
              onChange={(e) => setSelectedVerb(e.target.value as any)}
              className={`w-full p-3.5 rounded-2xl font-bold appearance-none bg-white border-2 border-gray-100 focus:border-${activeColor}-600 focus:outline-none transition-all text-gray-700 cursor-pointer shadow-sm text-sm`}
          >
              <option value="izan">NOR</option>
              <option value="nor-nori">NOR-NORI</option>
              <option value="ukan">NOR-NORK</option>
              <option value="nor-nori-nork">NOR-NORI-NORK</option>
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <i className={`fas fa-chevron-down text-gray-400 text-xs`}></i>
          </div>
        </div>
      </div>

      {selectedVerb === 'izan' && renderIzan()}
      {selectedVerb === 'nor-nori' && renderNorNori()}
      {selectedVerb === 'ukan' && renderUkan()}
      {selectedVerb === 'nor-nori-nork' && renderNorNoriNork()}

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mt-8">
        <div className="flex items-start space-x-4">
          <div className="bg-amber-100 p-2 rounded-lg">
            <i className="fas fa-lightbulb text-amber-600"></i>
          </div>
          <div>
            <h4 className="text-amber-900 font-bold mb-1 text-sm">Ikasteko trikimailua</h4>
            <p className="text-amber-800/80 text-xs leading-relaxed">
              {selectedVerb === 'izan' ? (
                <><strong>NOR (Izan):</strong> Aditz intrantsitiboak (ni nator, zu zara...). Denbora hipotetikoetan eta ahaleran, erroa <em>-teke</em> edo <em>-ke</em> partikulekin laguntzen da.</>
              ) : selectedVerb === 'nor-nori' ? (
                <><strong>NOR-NORI Ahalera:</strong> Erabili erro bereziak (<em>naki, haki, daki...</em>) eta gehitu potentzial marka (<em>-ke</em>) amaieran. Pluralean <em>-zki-</em> tartekatzen da.</>
              ) : (
                <><strong>Gramatika-araua:</strong> Aditz trantsitiboetan, nori-markak gehitu daitezke ekintzak hartzaile bat duenean. Gogoratu pluralgilea (<em>-zki-</em>) NOR plurala denean erabiltzen dela.</>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMode;
