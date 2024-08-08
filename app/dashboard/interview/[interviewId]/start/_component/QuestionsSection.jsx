import { Lightbulb } from 'lucide-react';
import React from 'react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  // Ensure mockInterviewQuestion is treated as an array
  const questions = Array.isArray(mockInterviewQuestion) ? mockInterviewQuestion : [];

  return (
    <div className='p-5 border rounded-lg'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <h2
              key={index}
              className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activeQuestionIndex === index ? 'bg-black text-white' : ''
              }`}
            >
              Question #{index + 1}
            </h2>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </div>
      {activeQuestionIndex >= 0 && activeQuestionIndex < questions.length && (
        <h2 className='my-5 text-sm md:text-lg'>
          {questions[activeQuestionIndex].Question}
        </h2>
      )}
      <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
        <h2 className='flex gap-2 items-center text-primay'>
            <Lightbulb/>
            <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-primary my-2'>When you're ready to answer, click the 'Record Answer' button. Your responses will be analyzed, and you'll receive feedback at the end, including the expected answer and suggestions for improvement.</h2>
      </div>
    </div>
  );
}

export default QuestionsSection;
