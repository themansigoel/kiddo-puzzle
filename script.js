// Blog Articles Data for SEO/GEO and Reader Modal
const articles = {
    1: {
        title: "Why Ad-Free Screen Time Matters for Young Children",
        author: "By Sarah Jenkins, Early Child Dev Specialist",
        content: `
            <p>In today's digital age, children are exposed to screens earlier than ever. While educational apps can offer fantastic opportunities for early learning, the inclusion of advertisements can severely impact a child's cognitive development.</p>
            
            <p><strong>1. Overstimulation and Cognitive Load</strong><br>
            Toddlers and young children have developing brains that are highly sensitive to sudden auditory and visual changes. Many third-party ads rely on loud noises, flashing lights, and fast transitions. This level of sensory input can lead to overstimulation, causing irritability, shorter attention spans, and difficulty transitioning back to offline tasks.</p>
            
            <p><strong>2. Interrupted Flow State & Learning Loops</strong><br>
            When a child is engaged in a matching puzzle, they enter a state of deep concentration (flow). An ad pop-up completely breaks this learning loop. Re-focusing on the task takes significant cognitive energy, reducing the educational efficacy of the activity.</p>
            
            <p><strong>3. ACCIDENTALLY CLICKING TARGETS</strong><br>
            Because children's motor skills are still developing, they often tap ads by accident, leading to redirect loops that take them out of the app. This creates a stressful loop for both the child and the parent.</p>
            
            <p><strong>Conclusion:</strong> Apps like KiddoPuzzle that offer a strictly ad-free environment, guarded by a secure parental gate, respect the child’s learning process and provide parents with peace of mind.</p>
        `
    },
    2: {
        title: "How Shape Puzzles Build Spatial Awareness & Motor Skills",
        author: "By Dr. Elena Rostova, Pediatric Occupational Therapist",
        content: `
            <p>Puzzles have been a staple of early childhood play for centuries. When translated properly into digital formats, interactive shape-matching games continue to serve as vital tools for development.</p>
            
            <p><strong>1. Spatial Awareness and Rotation</strong><br>
            Understanding how shapes relate to each other in space is a fundamental mathematical skill. When a child drags a piece and rotates it or aligns it with a matching silhouette, they are training their brain to visualize spatial movements—a precursor to geometry and advanced problem solving.</p>
            
            <p><strong>2. Fine Motor Coordination</strong><br>
            Precise drag-and-drop interactions on a tablet or phone screen require coordination between the eyes, hands, and small muscle groups in the fingers. Moving a puzzle piece to a matching slot is an excellent way to practice precision grip and steady finger movement.</p>
            
            <p><strong>3. Persistence and Dopamine Rewards</strong><br>
            Completing a puzzle gives kids a natural accomplishment high. The gentle, encouraging celebration cues (such as popping balloons) reinforce persistence. Over time, this builds self-esteem and encourages children to tackle more difficult tasks.</p>
            
            <p><strong>Conclusion:</strong> Choosing progressive, multi-level puzzle games ensures your child's brain is continually challenged as they grow from simple shapes to complex composite pictures.</p>
        `
    }
};

// Modal Open/Close Logic
const modal = document.getElementById("article-modal");
const modalBody = document.getElementById("modal-body");

function openArticle(id) {
    const article = articles[id];
    if (article) {
        modalBody.innerHTML = `
            <span class="close-btn" onclick="closeArticle()">&times;</span>
            <h2 class="modal-title">${article.title}</h2>
            <div class="modal-author">${article.author}</div>
            <div class="modal-text">${article.content}</div>
        `;
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Disable background scrolling
    }
}

function closeArticle() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target === modal) {
        closeArticle();
    }
}

// Interactive Mockup Mini-game (Drag and Drop)
document.addEventListener("DOMContentLoaded", () => {
    const pieces = document.querySelectorAll(".drag-piece");
    const silhouettes = document.querySelectorAll(".puzzle-silhouette");
    let matches = 0;

    pieces.forEach(piece => {
        piece.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", e.target.textContent);
            e.dataTransfer.setData("piece-class", e.target.classList[1]); // e.g. piece-1
        });

        // Touch support for mobile devices
        piece.addEventListener("touchmove", (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            piece.style.position = "absolute";
            piece.style.zIndex = 1000;
            piece.style.left = `${touch.clientX - 27}px`;
            piece.style.top = `${touch.clientY - 27}px`;
        });

        piece.addEventListener("touchend", (e) => {
            piece.style.position = "static";
            piece.style.zIndex = "auto";
            
            const touch = e.changedTouches[0];
            const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
            
            if (dropTarget && dropTarget.classList.contains("puzzle-silhouette")) {
                handleMatchAttempt(piece, dropTarget);
            }
        });
    });

    silhouettes.forEach(silhouette => {
        silhouette.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        silhouette.addEventListener("drop", (e) => {
            e.preventDefault();
            const text = e.dataTransfer.getData("text/plain");
            const pieceClass = e.dataTransfer.getData("piece-class");
            const matchedPiece = document.querySelector(`.${pieceClass}`);
            
            if (matchedPiece) {
                handleMatchAttempt(matchedPiece, e.target);
            }
        });
    });

    function handleMatchAttempt(piece, target) {
        // Match condition check (e.g. piece-1 matches target-1)
        const pieceNum = piece.className.match(/piece-(\d+)/)[1];
        const targetNum = target.className.match(/target-(\d+)/)[1];

        if (pieceNum === targetNum) {
            target.classList.add("drop-completed");
            target.innerHTML = piece.innerHTML;
            piece.style.visibility = "hidden";
            matches++;

            // Play light feedback
            if (window.navigator.vibrate) {
                window.navigator.vibrate(50);
            }

            if (matches === 4) {
                setTimeout(() => {
                    alert("🎉 Great job! Puzzle Complete! Download KiddoPuzzle for 40+ more levels.");
                    resetMockup();
                }, 400);
            }
        } else {
            // Shake or visual bounce effect for wrong match
            target.style.backgroundColor = "rgba(255, 118, 117, 0.3)";
            setTimeout(() => {
                target.style.backgroundColor = "rgba(45, 52, 54, 0.15)";
            }, 300);
        }
    }

    function resetMockup() {
        matches = 0;
        silhouettes.forEach(s => {
            s.classList.remove("drop-completed");
            const targetNum = s.className.match(/target-(\d+)/)[1];
            // Restore fruit emoticon
            const emoticons = { 1: "🍉", 2: "🍎", 3: "🍌", 4: "🍊" };
            s.textContent = emoticons[targetNum];
        });
        pieces.forEach(p => {
            p.style.visibility = "visible";
        });
    }
});
