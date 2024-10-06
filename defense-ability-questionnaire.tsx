import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const questions = [
  {
    id: 1,
    text: "באיזו תדירות אתה מוצא את עצמך מתכנן דברים ללא סיבה ממשית?",
    options: ["לעתים רחוקות מאוד", "לפעמים", "לעתים קרובות", "כמעט תמיד"]
  },
  {
    id: 2,
    text: "עד כמה אתה מרגיש מוגן מפני לחצי החיים?",
    options: ["מאוד מוגן", "די מוגן", "לא כל כך מוגן", "בכלל לא מוגן"]
  },
  {
    id: 3,
    text: "האם אתה מסוגל להקשיב לקול הפנימי שלך כשאתה מתכנן?",
    options: ["תמיד", "לרוב", "לפעמים", "לעתים רחוקות"]
  },
  {
    id: 4,
    text: "באיזו מידה אתה מרגיש שדאגה היא ערך מרכזי בחייך?",
    options: ["בכלל לא", "במידה מועטה", "במידה רבה", "במידה רבה מאוד"]
  },
  {
    id: 5,
    text: "עד כמה אתה מסוגל לזהות ולהפסיק תכנון לא רלוונטי?",
    options: ["תמיד", "לרוב", "לפעמים", "לעתים רחוקות"]
  },
  {
    id: 6,
    text: "באיזו מידה אתה חווה את החיים באופן מלא ופתוח?",
    options: ["במידה רבה מאוד", "במידה רבה", "במידה מועטה", "בכלל לא"]
  },
  {
    id: 7,
    text: "עד כמה אתה מרגיש אופטימי ומשוחרר בחייך?",
    options: ["מאוד", "די", "לא כל כך", "בכלל לא"]
  },
  {
    id: 8,
    text: "באיזו תדירות אתה מוצא את עצמך מתכנן מתוך פחד או דאגה?",
    options: ["לעתים רחוקות מאוד", "לפעמים", "לעתים קרובות", "כמעט תמיד"]
  },
  {
    id: 9,
    text: "עד כמה קל לך למצוא סליחה וחמלה כלפי עצמך ואחרים?",
    options: ["קל מאוד", "די קל", "לא כל כך קל", "קשה מאוד"]
  },
  {
    id: 10,
    text: "באיזו מידה אתה מרגיש שאתה נותן לאחרים באופן מאוזן?",
    options: ["מאוזן מאוד", "די מאוזן", "לא כל כך מאוזן", "בכלל לא מאוזן"]
  }
];

const DefenseAbilityQuestionnaire = () => {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateScore = () => {
    let score = 0;
    Object.values(answers).forEach(answer => {
      score += 4 - answer; // Reverse scoring
    });
    return score;
  };

  const getInterpretation = (score) => {
    if (score >= 35) return "יכולת הגנה גבוהה";
    if (score >= 25) return "יכולת הגנה בינונית";
    return "יכולת הגנה נמוכה";
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      setShowResults(true);
    } else {
      alert("נא לענות על כל השאלות לפני הגשת השאלון");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>שאלון יכולת ההגנה</CardTitle>
      </CardHeader>
      <CardContent>
        {questions.map(question => (
          <div key={question.id} className="mb-4">
            <p className="mb-2">{question.text}</p>
            <RadioGroup
              onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
              className="flex flex-col space-y-1"
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`q${question.id}-${index}`} />
                  <Label htmlFor={`q${question.id}-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
        <Button onClick={handleSubmit} className="mt-4">הגש שאלון</Button>

        {showResults && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-2">תוצאות</h3>
            <p>הציון שלך: {calculateScore()} מתוך 40</p>
            <p>פרשנות: {getInterpretation(calculateScore())}</p>
            <p className="mt-4">
              זכרו, זהו כלי להערכה עצמית בלבד. לקבלת הערכה מקצועית, פנו לאיש מקצוע מוסמך.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DefenseAbilityQuestionnaire;
