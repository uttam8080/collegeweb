import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, HelpCircle, Award, RotateCcw } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface Props {
  lessonId: string;
  questions: QuizQuestion[];
  onQuizComplete?: (score: number) => void;
}

export const QuizCard: React.FC<Props> = ({ lessonId, questions, onQuizComplete }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const score = calculateScore();
    soundEngine.playChime();
    if (onQuizComplete) {
      onQuizComplete(score);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const allAnswered = questions.every((q) => selectedAnswers[q.id] !== undefined);
  const score = calculateScore();

  return (
    <div className="my-10 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
            <HelpCircle className="w-4 h-4" />
            <span>Interactive Knowledge Verification</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">Test Your Understanding</h3>
        </div>
        {submitted && (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-lg border border-emerald-200 text-xs font-semibold">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>
              Score: {score} of {questions.length} Correct ({Math.round((score / questions.length) * 100)}%)
            </span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q, qIndex) => {
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correctIndex;

          return (
            <div key={q.id} className="p-4 sm:p-5 rounded-xl border border-stone-100 bg-stone-50/50">
              <p className="text-sm sm:text-base font-semibold text-slate-900 mb-3">
                <span className="text-amber-700 mr-2">{qIndex + 1}.</span>
                {q.question}
              </p>

              <div className="space-y-2">
                {q.options.map((option, optIndex) => {
                  const isOptionSelected = userAnswer === optIndex;
                  const isOptionCorrect = optIndex === q.correctIndex;

                  let optionStyle = 'border-stone-200 bg-white hover:border-amber-300 hover:bg-amber-50/30 text-slate-800';
                  if (submitted) {
                    if (isOptionCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                    } else if (isOptionSelected && !isOptionCorrect) {
                      optionStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                    } else {
                      optionStyle = 'border-stone-200 bg-stone-100/50 text-stone-400';
                    }
                  } else if (isOptionSelected) {
                    optionStyle = 'border-[#172554] bg-indigo-50/50 text-[#172554] font-medium ring-1 ring-[#172554]';
                  }

                  return (
                    <button
                      type="button"
                      key={optIndex}
                      onClick={() => handleSelect(q.id, optIndex)}
                      disabled={submitted}
                      className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm flex items-center justify-between transition-colors ${optionStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full border border-stone-300 flex items-center justify-center text-[10px] font-mono shrink-0">
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span>{option}</span>
                      </div>
                      {submitted && isOptionCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      {submitted && isOptionSelected && !isOptionCorrect && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="mt-3 p-3 rounded-lg bg-stone-100 text-xs text-stone-700 leading-relaxed border border-stone-200">
                  <strong className="text-slate-900 block mb-0.5">
                    {isCorrect ? 'Correct!' : 'Explanation:'}
                  </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-100">
          <p className="text-xs text-stone-500">
            {submitted
              ? `You scored ${score} out of ${questions.length}.`
              : allAnswered
              ? 'All questions answered! Click submit to review.'
              : 'Please answer all questions before submitting.'}
          </p>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {submitted ? (
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors w-full sm:w-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Quiz</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!allAnswered}
                className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors w-full sm:w-auto ${
                  allAnswered
                    ? 'bg-[#172554] text-white hover:bg-slate-800'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                Submit Answers
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
