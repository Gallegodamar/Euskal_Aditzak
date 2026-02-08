
import React, { useState, useEffect, useCallback } from 'react';
import { VERB_DATA, TENSE_NAMES, SUBJECT_FULL_NAMES } from '../constants';
import { Question } from '../types';

type CaseType = 'nor' | 'nor-nork' | 'nor-nori' | 'nor-nori-nork';

const GameMode: React.FC = () => {
  const [gameState, setGameState] = useState<'setup' | 'playing'>('setup');
  const [selectedCases, setSelectedCases] = useState<Set<CaseType>>(new Set(['nor']));
  const [question, setQuestion] = useState<Question & { nori?: string; norObj?: string } | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean } | null>(null);

  const toggleCase = (caseType: CaseType) => {
    const newCases = new Set(selectedCases);
    if (newCases.has(caseType)) {
      if (newCases.size > 1) newCases.delete(caseType);
    } else {
      newCases.add(caseType);
    }
    setSelectedCases(newCases);
  };

  const selectAllCases = () => {
    setSelectedCases(new Set(['nor', 'nor-nork', 'nor-nori', 'nor-nori-nork']));
  };

  const generateQuestion = useCallback(() => {
    const casesArray = Array.from(selectedCases);
    const verbType = casesArray[Math.floor(Math.random() * casesArray.length)];

    const subjectsIzan = ["ni", "hi", "hura", "gu", "zu", "zuek", "haiek"];
    const subjectsUkan = ["nik", "hik", "hark", "guk", "zuk", "zuek", "haiek"];
    const noriOptions = ["niri", "hiri", "hari", "guri", "zuri", "zuei", "haiei"];
    
    let subject = "";
    let tense = "";
    let verb = "";
    let correctAnswer = "";
    let objNum: "singular" | "plural" | undefined;
    let nori: string | undefined;
    let norObj: string | undefined;

    if (verbType === 'nor-nori-nork') {
      verb = "nor-nori-nork";
      const n3Tenses = Object.keys(VERB_DATA.ukan["nor-nori-nork"]);
      tense = n3Tenses[Math.floor(Math.random() * n3Tenses.length)];
      nori = noriOptions[Math.floor(Math.random() * noriOptions.length)];
      const validNork = subjectsUkan.filter(s => (VERB_DATA.ukan["nor-nori-nork"][tense].singularra as any)[nori!][s]);
      subject = validNork[Math.floor(Math.random() * validNork.length)];
      const isPlural = Math.random() > 0.5;
      objNum = isPlural ? "plural" : "singular";
      const dataSet = isPlural ? VERB_DATA.ukan["nor-nori-nork"][tense].plurala : VERB_DATA.ukan["nor-nori-nork"][tense].singularra;
      correctAnswer = (dataSet as any)[nori][subject];
    } else if (verbType === 'nor-nori') {
      verb = "nor-nori";
      const norNoriTenses = Object.keys(VERB_DATA.izan["nor-nori"]);
      tense = norNoriTenses[Math.floor(Math.random() * norNoriTenses.length)];
      subject = subjectsIzan[Math.floor(Math.random() * subjectsIzan.length)];
      const validNoriForSubject = noriOptions.filter(n => (VERB_DATA.izan["nor-nori"][tense] as any)[subject]?.[n]);
      nori = validNoriForSubject[Math.floor(Math.random() * validNoriForSubject.length)];
      correctAnswer = (VERB_DATA.izan["nor-nori"][tense] as any)[subject][nori];
    } else if (verbType === 'nor-nork') {
      verb = "ukan";
      const ukanTenses = Object.keys(VERB_DATA.ukan["nor-nork"]);
      tense = ukanTenses[Math.floor(Math.random() * ukanTenses.length)];
      
      // Use full matrix for ORAINA and IRAGANA
      if (tense === 'oraina' || tense === 'iragana') {
        norObj = subjectsIzan[Math.floor(Math.random() * subjectsIzan.length)];
        const validNork = subjectsUkan.filter(s => (VERB_DATA.ukan["nor-nork"][tense] as any)[norObj!][s]);
        subject = validNork[Math.floor(Math.random() * validNork.length)];
        correctAnswer = (VERB_DATA.ukan["nor-nork"][tense] as any)[norObj][subject];
      } else {
        // Only singular/plural (hura/haiek) for other complex tenses
        subject = subjectsUkan[Math.floor(Math.random() * subjectsUkan.length)];
        const ukanKey: "singularra" | "plurala" = Math.random() > 0.5 ? "singularra" : "plurala";
        correctAnswer = (VERB_DATA.ukan["nor-nork"][tense] as any)[ukanKey][subject];
        objNum = ukanKey === "singularra" ? "singular" : "plural";
        norObj = ukanKey === "singularra" ? "hura" : "haiek";
      }
    } else {
      verb = "izan";
      const tenses = Object.keys(VERB_DATA.izan.nor);
      tense = tenses[Math.floor(Math.random() * tenses.length)];
      subject = subjectsIzan[Math.floor(Math.random() * subjectsIzan.length)];
      correctAnswer = (VERB_DATA.izan.nor[tense] as any)[subject];
    }

    // Distractor pool
    const globalDistractors: string[] = [];
    Object.values(VERB_DATA.izan.nor.oraina).forEach(v => globalDistractors.push(v as string));
    Object.values(VERB_DATA.ukan["nor-nork"].oraina.singularra).forEach(v => globalDistractors.push(v as string));
    Object.values(VERB_DATA.ukan["nor-nork"].oraina.plurala).forEach(v => globalDistractors.push(v as string));
    
    // Add specifically matching distractors if in a complex tense matrix
    if (verbType === 'nor-nork' && (tense === 'oraina' || tense === 'iragana') && norObj) {
      const matrix = (VERB_DATA.ukan["nor-nork"][tense] as any)[norObj];
      if (matrix) Object.values(matrix).forEach(v => globalDistractors.push(v as string));
    }

    const distractors = Array.from(new Set(globalDistractors.filter(a => a !== correctAnswer)))
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    while (distractors.length < 3) {
      distractors.push("---");
    }

    const options = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());

    setQuestion({
      id: Math.random().toString(36).substr(2, 9),
      subject,
      tense,
      verb,
      objectNumber: objNum,
      correctAnswer,
      options,
      nori,
      norObj
    });
    setAnswered(false);
    setSelectedOption(null);
    setFeedback(null);
  }, [selectedCases]);

  const handleOptionClick = (option: string) => {
    if (answered || !question) return;
    const isCorrect = option === question.correctAnswer;
    setSelectedOption(option);
    setAnswered(true);
    if (isCorrect) setScore(s => s + 1);
    setFeedback({ isCorrect });
  };

  const startGame = () => {
    if (selectedCases.size > 0) {
      setGameState('playing');
      setScore(0);
      generateQuestion();
    }
  };

  if (gameState === 'setup') {
    return (
      <div className="max-w-2xl mx-auto py-10 animate-in fade-in zoom-in duration-300">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
          <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-play text-emerald-600 text-3xl"></i>
          </div>
          <h2 className="text-3xl font-black text-gray-900 basque-font uppercase mb-2">Konfiguratu Jokoa</h2>
          <p className="text-gray-500 mb-8">Aukeratu zein aditz-kasu agertuko diren galderetan:</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {(['nor', 'nor-nork', 'nor-nori', 'nor-nori-nork'] as CaseType[]).map((c) => (
              <button
                key={c}
                onClick={() => toggleCase(c)}
                className={`p-4 rounded-2xl border-2 font-bold transition-all flex items-center justify-between ${
                  selectedCases.has(c) 
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-sm' 
                    : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                }`}
              >
                <span className="uppercase">{c}</span>
                <i className={`fas ${selectedCases.has(c) ? 'fa-check-circle' : 'fa-circle-notch opacity-20'}`}></i>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={selectAllCases}
              className="px-6 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
              Denak Hautatu
            </button>
            <button
              onClick={startGame}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transform transition active:scale-95 shadow-lg mt-2"
            >
              Hasi Jolasten
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!question) return null;

  const getThemeColor = () => {
    if (question.verb === 'nor-nori-nork') return 'bg-purple-600';
    if (question.verb === 'nor-nori') return 'bg-orange-600';
    if (question.verb === 'ukan') return 'bg-blue-600';
    return 'bg-emerald-600';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 font-bold text-gray-600">
          🏆 Puntuak: <span className="text-emerald-600">{score}</span>
        </div>
        <button 
          onClick={() => setGameState('setup')} 
          className="bg-gray-100 px-4 py-2 rounded-xl text-gray-500 hover:text-gray-700 text-xs font-bold transition-all"
        >
          <i className="fas fa-arrow-left mr-2"></i> Aldatu Aukerak
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className={`p-8 text-center text-white transition-colors duration-500 ${getThemeColor()}`}>
          <p className="text-white/70 uppercase tracking-widest text-xs font-bold mb-4">
             {question.verb === 'nor-nori-nork' ? 'NOR-NORI-NORK' : question.verb === 'nor-nori' ? 'NOR-NORI' : question.verb === 'ukan' ? 'NOR-NORK' : 'NOR'}
          </p>
          <div className="space-y-2">
            <h3 className="text-4xl font-black basque-font uppercase leading-tight">
              {question.subject.toUpperCase()} 
              {question.nori && <span className="text-white/60 mx-2">→</span>}
              {question.nori && <span className="text-yellow-300">{question.nori.toUpperCase()}</span>}
              <br />
              <span className="text-2xl opacity-90">
                {question.norObj ? `(${question.norObj})` : (question.objectNumber === 'singular' ? '(hura)' : '(haiek)')}
              </span>
            </h3>
            <p className="text-white/80 font-medium pt-2">
              {TENSE_NAMES[question.tense] || question.tense.replace('_', ' ').toUpperCase()}
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {question.options.map((option) => (
              <button
                key={option}
                disabled={answered}
                onClick={() => handleOptionClick(option)}
                className={`p-5 rounded-2xl border-2 font-bold text-xl transition-all ${
                  !answered ? 'border-gray-100 hover:border-gray-300 hover:bg-gray-50 text-gray-700' :
                  option === question.correctAnswer ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md scale-105' :
                  selectedOption === option ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-50 text-gray-300 opacity-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {feedback && (
            <div className={`mt-6 p-6 rounded-2xl animate-in fade-in slide-in-from-top-2 ${feedback.isCorrect ? 'bg-emerald-50' : 'bg-red-50'}`}>
              <div className="flex gap-4">
                <i className={`fas ${feedback.isCorrect ? 'fa-check-circle text-emerald-500' : 'fa-times-circle text-red-500'} text-2xl mt-1`}></i>
                <div className="flex-1">
                  <p className={`font-bold ${feedback.isCorrect ? 'text-emerald-900' : 'text-red-900'}`}>
                    {feedback.isCorrect ? 'Bikain!' : 'Errorea!'}
                  </p>
                  {!feedback.isCorrect && (
                    <p className="text-red-800 text-sm mt-1 font-semibold">
                      Erantzun zuzena: <span className="underline decoration-2">{question.correctAnswer}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {answered && (
            <button
              onClick={generateQuestion}
              className="w-full mt-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-black transform transition active:scale-95 shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Jarraitu</span>
              <i className="fas fa-arrow-right text-xs"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameMode;
