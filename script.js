// ==========================================
// LIFE DECISION SIMULATOR
// ==========================================


// ==========================================
// ELEMENTS
// ==========================================

const decisionInput =
    document.getElementById("decision");

const simulateBtn =
    document.getElementById("simulateBtn");

const resultContent =
    document.getElementById("resultContent");

const emptyResult =
    document.getElementById("emptyResult");

const scoreElement =
    document.getElementById("score");

const recommendationElement =
    document.getElementById("recommendation");

const decisionText =
    document.getElementById("decisionText");

const riskLevelElement =
    document.getElementById("riskLevel");

const confidenceLevelElement =
    document.getElementById("confidenceLevel");

const benefitLevelElement =
    document.getElementById("benefitLevel");

const meterFill =
    document.getElementById("meterFill");

const meterText =
    document.getElementById("meterText");

const bestCaseElement =
    document.getElementById("bestCase");

const likelyCaseElement =
    document.getElementById("likelyCase");

const worstCaseElement =
    document.getElementById("worstCase");

const historyContainer =
    document.getElementById("historyContainer");

const clearHistoryBtn =
    document.getElementById("clearHistoryBtn");


// ==========================================
// RATING ELEMENTS
// ==========================================

const ratings = [
    "importance",
    "benefit",
    "risk",
    "time",
    "urgency",
    "confidence"
];


ratings.forEach(
    function (rating) {

        const slider =
            document.getElementById(rating);

        const value =
            document.getElementById(
                rating + "Value"
            );


        slider.addEventListener(
            "input",
            function () {

                value.innerText =
                    slider.value;

            }
        );

    }
);


// ==========================================
// HISTORY
// ==========================================

let decisionHistory =
    JSON.parse(
        localStorage.getItem(
            "decisionSimulatorHistory"
        )
    ) || [];


// ==========================================
// SIMULATE DECISION
// ==========================================

simulateBtn.addEventListener(
    "click",
    function () {

        const decision =
            decisionInput.value.trim();


        if (decision === "") {

            alert(
                "Please enter the decision you are considering."
            );

            decisionInput.focus();

            return;

        }


        const importance =
            Number(
                document.getElementById(
                    "importance"
                ).value
            );


        const benefit =
            Number(
                document.getElementById(
                    "benefit"
                ).value
            );


        const risk =
            Number(
                document.getElementById(
                    "risk"
                ).value
            );


        const time =
            Number(
                document.getElementById(
                    "time"
                ).value
            );


        const urgency =
            Number(
                document.getElementById(
                    "urgency"
                ).value
            );


        const confidence =
            Number(
                document.getElementById(
                    "confidence"
                ).value
            );


        // ==============================
        // DECISION SCORE
        // ==============================

        let score =
            (
                benefit * 3
            ) +
            (
                confidence * 2
            ) +
            (
                importance * 1.5
            ) +
            (
                urgency * 1
            ) -
            (
                risk * 2
            ) -
            (
                time * 1
            );


        score =
            Math.round(
                (score / 75) * 100
            );


        score =
            Math.max(
                0,
                Math.min(
                    100,
                    score
                )
            );


        // ==============================
        // RECOMMENDATION
        // ==============================

        let recommendation;
        let message;


        if (score >= 75) {

            recommendation =
                "GO FOR IT";

            message =
                "The potential benefits and your confidence strongly support this decision.";

        }

        else if (score >= 55) {

            recommendation =
                "CONSIDER CAREFULLY";

            message =
                "This decision has potential, but you should review the risks and time commitment.";

        }

        else if (score >= 35) {

            recommendation =
                "WAIT & REASSESS";

            message =
                "The decision is not clearly favorable yet. Gather more information before proceeding.";

        }

        else {

            recommendation =
                "AVOID FOR NOW";

            message =
                "The current risks and costs appear to outweigh the expected benefits.";

        }


        // ==============================
        // RISK LEVEL
        // ==============================

        let riskLevel;


        if (risk <= 3) {

            riskLevel = "LOW";

        }

        else if (risk <= 6) {

            riskLevel = "MEDIUM";

        }

        else {

            riskLevel = "HIGH";

        }


        // ==============================
        // CONFIDENCE LEVEL
        // ==============================

        let confidenceLevel;


        if (confidence <= 3) {

            confidenceLevel = "LOW";

        }

        else if (confidence <= 6) {

            confidenceLevel = "MEDIUM";

        }

        else {

            confidenceLevel = "HIGH";

        }


        // ==============================
        // BENEFIT LEVEL
        // ==============================

        let benefitLevel;


        if (benefit <= 3) {

            benefitLevel = "LOW";

        }

        else if (benefit <= 6) {

            benefitLevel = "MEDIUM";

        }

        else {

            benefitLevel = "HIGH";

        }


        // ==============================
        // UPDATE RESULT
        // ==============================

        scoreElement.innerText =
            score;

        recommendationElement.innerText =
            recommendation;

        decisionText.innerText =
            message;

        riskLevelElement.innerText =
            riskLevel;

        confidenceLevelElement.innerText =
            confidenceLevel;

        benefitLevelElement.innerText =
            benefitLevel;


        meterFill.style.width =
            score + "%";

        meterText.innerText =
            score + "%";


        // ==============================
        // FUTURE OUTCOMES
        // ==============================

        generateFutureOutcomes(
            benefit,
            risk,
            confidence,
            time,
            decision
        );


        // ==============================
        // SHOW RESULT
        // ==============================

        emptyResult.classList.add(
            "hidden"
        );

        resultContent.classList.remove(
            "hidden"
        );


        // ==============================
        // SAVE HISTORY
        // ==============================

        const historyItem = {

            id: Date.now(),

            decision: decision,

            score: score,

            recommendation:
                recommendation,

            date:
                new Date().toLocaleDateString(
                    "en-IN"
                )

        };


        decisionHistory.unshift(
            historyItem
        );


        if (
            decisionHistory.length > 10
        ) {

            decisionHistory =
                decisionHistory.slice(
                    0,
                    10
                );

        }


        saveHistory();

        displayHistory();


        // ==============================
        // SCROLL TO RESULT
        // ==============================

        document
            .getElementById("result")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


// ==========================================
// GENERATE FUTURE OUTCOMES
// ==========================================

function generateFutureOutcomes(
    benefit,
    risk,
    confidence,
    time,
    decision
) {

    let bestCase;
    let likelyCase;
    let worstCase;


    // ==============================
    // BEST CASE
    // ==============================

    if (benefit >= 7) {

        bestCase =
            "This could create a strong positive result. You may gain valuable opportunities, experience, confidence and long-term benefits.";

    }

    else {

        bestCase =
            "The decision could still work out positively and give you useful experience or a new opportunity.";

    }


    if (confidence >= 7) {

        bestCase +=
            " Your high confidence can help you handle challenges effectively.";

    }


    // ==============================
    // LIKELY CASE
    // ==============================

    if (
        benefit >= 6 &&
        risk <= 6
    ) {

        likelyCase =
            "You are likely to receive a reasonable benefit, although some effort and adjustment may be required.";

    }

    else if (risk > 6) {

        likelyCase =
            "You may gain something useful, but the outcome could involve unexpected difficulties and extra pressure.";

    }

    else {

        likelyCase =
            "The result may be moderate. You could gain some benefits without experiencing major changes.";

    }


    if (time >= 7) {

        likelyCase +=
            " The main challenge may be managing the time required.";

    }


    // ==============================
    // WORST CASE
    // ==============================

    if (risk >= 7) {

        worstCase =
            "The decision could lead to unexpected problems, wasted resources or disappointment if the major risks are not controlled.";

    }

    else {

        worstCase =
            "The decision may not produce the expected result. You could lose some time or effort, but the setback may still provide useful learning.";

    }


    if (confidence <= 3) {

        worstCase +=
            " Your current lack of confidence may make the situation more difficult.";

    }


    bestCaseElement.innerText =
        bestCase;

    likelyCaseElement.innerText =
        likelyCase;

    worstCaseElement.innerText =
        worstCase;

}


// ==========================================
// SAVE HISTORY
// ==========================================

function saveHistory() {

    localStorage.setItem(
        "decisionSimulatorHistory",
        JSON.stringify(
            decisionHistory
        )
    );

}


// ==========================================
// DISPLAY HISTORY
// ==========================================

function displayHistory() {

    historyContainer.innerHTML =
        "";


    if (
        decisionHistory.length === 0
    ) {

        historyContainer.innerHTML = `

            <div class="history-empty">

                No previous decisions yet.

            </div>

        `;

        return;

    }


    decisionHistory.forEach(
        function (item) {

            const historyElement =
                document.createElement(
                    "div"
                );


            historyElement.className =
                "history-item";


            historyElement.innerHTML = `

                <div class="history-info">

                    <h4>
                        ${escapeHTML(
                            item.decision
                        )}
                    </h4>

                    <p>
                        ${item.recommendation}
                        • ${item.date}
                    </p>

                </div>


                <div class="history-score">

                    ${item.score}/100

                </div>


                <button
                    class="history-delete"
                    onclick="deleteHistory(${item.id})"
                >
                    Delete
                </button>

            `;


            historyContainer.appendChild(
                historyElement
            );

        }
    );

}


// ==========================================
// DELETE HISTORY ITEM
// ==========================================

function deleteHistory(id) {

    decisionHistory =
        decisionHistory.filter(
            function (item) {

                return item.id !== id;

            }
        );


    saveHistory();

    displayHistory();

}


// ==========================================
// CLEAR HISTORY
// ==========================================

clearHistoryBtn.addEventListener(
    "click",
    function () {

        if (
            decisionHistory.length === 0
        ) {

            alert(
                "There is no history to clear."
            );

            return;

        }


        const confirmClear =
            confirm(
                "Are you sure you want to clear all decision history?"
            );


        if (!confirmClear) {
            return;
        }


        decisionHistory = [];


        saveHistory();

        displayHistory();

    }
);


// ==========================================
// HTML SECURITY
// ==========================================

function escapeHTML(text) {

    return text
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


// ==========================================
// INITIAL LOAD
// ==========================================

displayHistory();