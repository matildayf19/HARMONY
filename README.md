<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>שאלון יכולת ההגנה</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #E0FFFF;
        }
        h1, h2 {
            text-align: center;
            color: #20B2AA;
        }
        .question, #results, #feedback {
            background-color: #AFEEEE;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
            border: 2px solid #48D1CC;
        }
        button {
            display: block;
            margin: 20px auto;
            padding: 10px 20px;
            font-size: 16px;
            background-color: #20B2AA;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        #results, #feedback {
            display: none;
        }
        textarea {
            width: 100%;
            height: 100px;
            margin-top: 10px;
        }
        .copyright {
            text-align: center;
            font-size: 12px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>שאלון יכולת ההגנה</h1>
    <div id="questionnaire"></div>
    <button onclick="submitQuestionnaire()">הגישי שאלון</button>
    <div id="results"></div>
    <div id="feedback">
        <h2>משוב על השאלון</h2>
        <select id="feedbackRating">
            <option value="">בחרי דירוג</option>
            <option value="5">מצוין</option>
            <option value="4">טוב מאוד</option>
            <option value="3">סביר</option>
            <option value="2">לא משהו</option>
            <option value="1">גרוע</option>
        </select>
        <textarea id="feedbackComment" placeholder="הוסיפי הערות או משוב נוסף כאן"></textarea>
        <button onclick="submitFeedback()">שלחי משוב</button>
    </div>
    <div class="copyright">כל הזכויות שמורות למטילדה יקואל פרידמן © 2024</div>

    <script>
        const questions = [
            {
                text: "באיזו תדירות את מוצאת את עצמך מתכננת דברים ללא סיבה ממשית?",
                options: ["לעתים רחוקות מאוד", "לפעמים", "לעתים קרובות", "כמעט תמיד"]
            },
            {
                text: "עד כמה את מרגישה מוגנת מפני לחצי החיים?",
                options: ["מאוד מוגנת", "די מוגנת", "לא כל כך מוגנת", "בכלל לא מוגנת"]
            },
            {
                text: "האם את מסוגלת להקשיב לקול הפנימי שלך כשאת מתכננת?",
                options: ["תמיד", "לרוב", "לפעמים", "לעתים רחוקות"]
            },
            {
                text: "באיזו מידה את מרגישה שדאגה היא ערך מרכזי בחייך?",
                options: ["בכלל לא", "במידה מועטה", "במידה רבה", "במידה רבה מאוד"]
            },
            {
                text: "עד כמה את מסוגלת לזהות ולהפסיק תכנון לא רלוונטי?",
                options: ["תמיד", "לרוב", "לפעמים", "לעתים רחוקות"]
            },
            {
                text: "באיזו מידה את חווה את החיים באופן מלא ופתוח?",
                options: ["במידה רבה מאוד", "במידה רבה", "במידה מועטה", "בכלל לא"]
            },
            {
                text: "עד כמה את מרגישה אופטימית ומשוחררת בחייך?",
                options: ["מאוד", "די", "לא כל כך", "בכלל לא"]
            },
            {
                text: "באיזו תדירות את מוצאת את עצמך מתכננת מתוך פחד או דאגה?",
                options: ["לעתים רחוקות מאוד", "לפעמים", "לעתים קרובות", "כמעט תמיד"]
            },
            {
                text: "עד כמה קל לך למצוא סליחה וחמלה כלפי עצמך ואחרים?",
                options: ["קל מאוד", "די קל", "לא כל כך קל", "קשה מאוד"]
            },
            {
                text: "באיזו מידה את מרגישה שאת נותנת לאחרים באופן מאוזן?",
                options: ["מאוזנת מאוד", "די מאוזנת", "לא כל כך מאוזנת", "בכלל לא מאוזנת"]
            }
        ];

        function renderQuestions() {
            const container = document.getElementById('questionnaire');
            questions.forEach((q, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'question';
                questionDiv.innerHTML = `
                    <p><strong>${q.text}</strong></p>
                    ${q.options.map((option, i) => `
                        <label>
                            <input type="radio" name="q${index}" value="${i}">
                            ${option}
                        </label>
                    `).join('<br>')}
                `;
                container.appendChild(questionDiv);
            });
        }

        function submitQuestionnaire() {
            let score = 0;
            questions.forEach((_, index) => {
                const selected = document.querySelector(`input[name="q${index}"]:checked`);
                if (selected) {
                    score += 4 - parseInt(selected.value);
                }
            });

            const resultsDiv = document.getElementById('results');
            resultsDiv.style.display = 'block';
            resultsDiv.innerHTML = `
                <h2>תוצאות</h2>
                <p>הציון שלך: ${score} מתוך ${questions.length * 4}</p>
                <p>פרשנות: ${getInterpretation(score)}</p>
                <p>${getDetailedInterpretation(score)}</p>
            `;
            document.getElementById('feedback').style.display = 'block';
        }

        function getInterpretation(score) {
            if (score >= 35) return "יכולת הגנה גבוהה";
            if (score >= 25) return "יכולת הגנה בינונית";
            return "יכולת הגנה נמוכה";
        }

        function getDetailedInterpretation(score) {
            if (score >= 35) {
                return "את מפגינה יכולת מצוינת בהגנה על הרווחה וההרמוניה הרגשית שלך. " +
                       "ניכר כי יש לך אמונה חזקה בעצמך ובכישורייך. את מסוגלת לסמוך על עצמך " +
                       "שתדעי לתכנן בצורה מדויקת כאשר באמת תידרשי לכך.";
            } else if (score >= 25) {
                return "יש לך בסיס טוב של יכולות הגנה, אך יתכן שלעתים את עדיין מתקשה לסמוך על עצמך באופן מלא. " +
                       "זכרי, תכנון מדויק נובע מאמונה בעצמך ומהיכולת לסמוך שתדעי לתכנן כשבאמת יהיה צורך.";
            } else {
                return "נראה כי את מתמודדת עם אתגרים בהגנה על הרווחה וההרמוניה הרגשית שלך, " +
                       "כנראה בשל קושי לסמוך על עצמך שתוכלי לתכנן בצורה מדויקת כשתידרשי לכך. " +
                       "זכרי שהתפתחות היא תהליך, וכל צעד קטן הוא משמעותי.";
            }
        }

        function submitFeedback() {
            const rating = document.getElementById('feedbackRating').value;
            const comment = document.getElementById('feedbackComment').value;
            alert('תודה על המשוב שלך!');
            // כאן אפשר להוסיף קוד לשליחת המשוב לשרת או לשמירה מקומית
        }

        renderQuestions();
    </script>
</body>
</html>
