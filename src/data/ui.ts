import type { Lang } from './types'

type F1 = (a: number) => string
type F2 = (a: number, b: number) => string

export interface UIStrings {
  tabs: string[]; meta: string; dashTitle: string; notice: string
  lessonsRead: string; quizAvg: string; lastExam: (passed: boolean) => string; noExam: string; toReview: string
  nextLesson: string; cont: string; allRead: string; domainDone: string; domainAllRead: string; upNext: string; lessonsLeft: F1; minutes: F1
  byWeight: string; hDomain: string; hWeight: string; hLessons: string; hBest: string; notDone: string; course: string; quiz: string
  plan4: string; examDate: string; daysLeft: F1; dayDone: string
  history: string; hDate: string; hQ: string; hOk: string; hScore: string; locale: string
  themeL: string; light: string; dark: string
  toc: string; lessonN: F2; markNext: string; markQuiz: F1; read: string; nextDomain: string; domainQuiz: F1
  quizTitle: (d: number, name: string) => string; qn: (i: number, n: number, answered: number) => string
  exam: string; practice: string; chooseN: F1
  correct: string; incorrect: string; prev: string; validate: string; next: string; flag: string; unflag: string
  endExam: string; confirmEnd: string; seeResult: string; endNotice: F2; qnav: string; qLabel: F1
  result: string; above: string; below: string; goalOk: string; goal: string; okOf: F2
  scaleNote: string; hResult: string; revisit: string; dash: string; reviewErr: F1; correction: string
  stOk: string; stBad: string; stNone: string
  bank: F1; examH: string; examIntro: string
  numQ: string; opt20: string; opt40: string; opt53: string; optAll: F1
  mode: string; modeExam: string; modePrac: string; domains: string; allD: string
  onlyD: (d: number, name: string) => string; start: string; examTitle: F1; examD: F1
  otherMocks: string; mock1: string; mock2: string
  errEyebrow: string; errTitle: string; errReview: F1; errQ: string; errNone: string; errRun: string
  trapEyebrow: string; trapTitle: string; hTrap: string; hReflex: string; fmt: string; fmtItems: string[]
}

export const UI: Record<Lang, UIStrings> = 
{
fr:{tabs:["Tableau de bord","Cours","Examen blanc","Erreurs","Pièges","Fiche"],
 meta:"53 questions · 120 min · réussite 720 / 1000 · Pearson VUE", dashTitle:"Préparation à l'examen CCDV-F",
 notice:"Contenu vérifié le 4 novembre 2026 contre le guide officiel v1.0, la FAQ Partner Academy et la documentation Anthropic. Examen avant le 17 novembre : le blueprint v1.0 s'applique. À faire aujourd'hui : vérifier l'éligibilité (email d'entreprise d'une organisation partenaire ; 7 à 10 jours si le domaine est nouveau) et réserver Pearson VUE. Report ou annulation : au moins 48 h avant (FAQ ; le guide dit 24 h).",
 lessonsRead:"leçons lues", quizAvg:"moyenne des quiz de domaine", lastExam:p=>"dernier examen blanc · "+(p?"réussi":"échoué"), noExam:"aucun examen blanc", toReview:"questions à réviser",
 nextLesson:"Prochaine leçon", cont:"Continuer le cours", allRead:"Toutes les leçons sont lues. Passe aux examens blancs complets.", domainDone:"du domaine complété", upNext:"À suivre", lessonsLeft:n=>n>1?n+" leçons restantes":n===1?"1 leçon restante":"Toutes les leçons sont lues", minutes:n=>n+" min", domainAllRead:"Toutes les leçons du domaine sont lues. Valide avec le quiz.",
 byWeight:"Domaines, par poids", hDomain:"Domaine", hWeight:"Poids", hLessons:"Leçons", hBest:"Meilleur quiz", notDone:"non fait", course:"Cours", quiz:"Quiz",
 plan4:"Sprint jusqu'à l'examen", examDate:"Date de mon examen", daysLeft:n=>n>1?"J-"+n+" (examen dans "+n+" jours)":n===1?"Examen demain":n===0?"Jour J":"Date passée", dayDone:"Fait", history:"Historique des examens blancs", hDate:"Date", hQ:"Questions", hOk:"Bonnes réponses", hScore:"Score estimé", locale:"fr-FR",
 themeL:"Thème", light:"Clair", dark:"Sombre",
 toc:"Sommaire du cours", lessonN:(i,n)=>"leçon "+i+" / "+n, markNext:"Marquer comme lue et continuer", markQuiz:d=>"Marquer comme lue et passer au quiz D"+d, read:"lue", nextDomain:"Domaine suivant", domainQuiz:n=>"Quiz du domaine ("+n+" questions)",
 quizTitle:(d,name)=>"Quiz D"+d+" · "+name, qn:(i,n,a)=>"Question "+i+" / "+n+" · "+a+" répondue(s)", exam:"examen", practice:"entraînement", chooseN:n=>"Choisissez "+n+" réponses",
 correct:"Correct. ", incorrect:"Incorrect. ", prev:"Précédente", validate:"Valider", next:"Suivante", flag:"Marquer pour revoir", unflag:"Retirer le marquage",
 endExam:"Terminer l'examen", confirmEnd:"Confirmer : terminer l'examen", seeResult:"Voir le résultat", endNotice:(u,f)=>u+" question(s) sans réponse, "+f+" marquée(s). Clique à nouveau pour terminer.", qnav:"Navigation entre questions", qLabel:k=>"Question "+k,
 result:" · résultat", above:"au-dessus de 720", below:"sous 720", goalOk:"objectif 80 % atteint", goal:"objectif : 80 %", okOf:(o,n)=>o+" bonnes réponses sur "+n,
 scaleNote:"Score estimé par une conversion linéaire (100 + 900 × taux de réussite). Le vrai score Anthropic est mis à l'échelle autrement : vise au moins 80 % de bonnes réponses.",
 hResult:"Résultat", revisit:"Revoir le cours", dash:"Tableau de bord", reviewErr:n=>"Réviser mes erreurs ("+n+")", correction:"Correction", stOk:"correct", stBad:"incorrect", stNone:"sans réponse",
 bank:n=>"Banque de "+n+" questions, réponses mélangées à chaque passage", examH:"Examen blanc", examIntro:"Les questions à réponses multiples indiquent combien de réponses choisir. Une question est juste seulement si toutes les bonnes réponses sont cochées et aucune autre.",
 numQ:"Nombre de questions", opt20:"20 questions (≈ 45 min)", opt40:"40 questions (≈ 91 min)", opt53:"53 questions (120 min, format réel)", optAll:n=>"Toute la banque ("+n+" questions)",
 mode:"Mode", modeExam:"Examen : chronométré, correction à la fin", modePrac:"Entraînement : sans chrono, correction après chaque question", domains:"Domaines", allD:"Tous, répartis selon les poids officiels", onlyD:(d,name)=>"D"+d+" · "+name+" seulement", start:"Commencer",
 examTitle:n=>"Examen blanc "+n+" questions", examD:d=>"Examen D"+d,
 otherMocks:"Autres examens blancs", mock1:" : 20/40/60 questions, modes examen et entraînement.", mock2:" : vise probablement l'examen Architect, à utiliser en complément.",
 errEyebrow:"Une question sort de la liste quand tu y réponds juste", errTitle:"Erreurs à réviser", errReview:n=>"Réviser les "+n+" question(s)", errQ:"Question", errNone:"Aucune erreur enregistrée. Fais un quiz de domaine ou un examen blanc.", errRun:"Révision des erreurs",
 trapEyebrow:"Mauvaises réponses typiques", trapTitle:"Pièges de l'examen", hTrap:"Piège", hReflex:"Bon réflexe", fmt:"Format à connaître",
 fmtItems:["53 questions à choix unique ou multiple, 120 minutes, environ 2 min 15 par question.","Score de réussite : 720 sur une échelle de 100 à 1000, résultats par domaine.","Pearson VUE, en centre ou en ligne surveillé, sans documents.","Réservé aux membres du Claude Partner Network ; 125 USD par tentative.","Repassage : attendre 14, 30 puis 90 jours ; 4 tentatives maximum sur 12 mois.","Report ou annulation : au moins 48 h avant (FAQ Partner Academy ; le guide v1.0 dit 24 h). Anglais ou japonais.","Les pourcentages par domaine sont informatifs : seule la note globale décide."]},
en:{tabs:["Dashboard","Course","Mock exam","Mistakes","Traps","Cheat sheet"],
 meta:"53 questions · 120 min · pass 720 / 1000 · Pearson VUE", dashTitle:"CCDV-F exam preparation",
 notice:"Content checked on November 4, 2026 against the official guide v1.0, the Partner Academy FAQ and Anthropic's documentation. Exam before November 17: blueprint v1.0 applies. Do today: check eligibility (company email of a partner organization; 7 to 10 days if the domain is new) and book Pearson VUE. Reschedule or cancel: at least 48 h ahead (FAQ; the guide says 24 h).",
 lessonsRead:"lessons read", quizAvg:"domain quiz average", lastExam:p=>"last mock exam · "+(p?"passed":"failed"), noExam:"no mock exam yet", toReview:"questions to review",
 nextLesson:"Next lesson", cont:"Continue the course", allRead:"All lessons are read. Move on to full mock exams.", domainDone:"of domain completed", upNext:"Up next", lessonsLeft:n=>n>1?n+" lessons left":n===1?"1 lesson left":"All lessons read", minutes:n=>n+" min", domainAllRead:"All lessons in this domain are read. Check yourself with the quiz.",
 byWeight:"Domains, by weight", hDomain:"Domain", hWeight:"Weight", hLessons:"Lessons", hBest:"Best quiz", notDone:"not done", course:"Course", quiz:"Quiz",
 plan4:"Sprint to exam day", examDate:"My exam date", daysLeft:n=>n>1?n+" days to go":n===1?"Exam tomorrow":n===0?"Exam day":"Date passed", dayDone:"Done", history:"Mock exam history", hDate:"Date", hQ:"Questions", hOk:"Correct answers", hScore:"Estimated score", locale:"en-GB",
 themeL:"Theme", light:"Light", dark:"Dark",
 toc:"Course contents", lessonN:(i,n)=>"lesson "+i+" / "+n, markNext:"Mark as read and continue", markQuiz:d=>"Mark as read and take the D"+d+" quiz", read:"read", nextDomain:"Next domain", domainQuiz:n=>"Domain quiz ("+n+" questions)",
 quizTitle:(d,name)=>"D"+d+" quiz · "+name, qn:(i,n,a)=>"Question "+i+" / "+n+" · "+a+" answered", exam:"exam", practice:"practice", chooseN:n=>"Choose "+n+" answers",
 correct:"Correct. ", incorrect:"Incorrect. ", prev:"Previous", validate:"Check", next:"Next", flag:"Flag for review", unflag:"Remove flag",
 endExam:"Finish the exam", confirmEnd:"Confirm: finish the exam", seeResult:"See the result", endNotice:(u,f)=>u+" unanswered question(s), "+f+" flagged. Click again to finish.", qnav:"Question navigation", qLabel:k=>"Question "+k,
 result:" · result", above:"above 720", below:"below 720", goalOk:"80% target reached", goal:"target: 80%", okOf:(o,n)=>o+" correct answers out of "+n,
 scaleNote:"Score estimated with a linear conversion (100 + 900 × success rate). Anthropic's real score is scaled differently: aim for at least 80% correct answers.",
 hResult:"Result", revisit:"Review the course", dash:"Dashboard", reviewErr:n=>"Review my mistakes ("+n+")", correction:"Answers", stOk:"correct", stBad:"incorrect", stNone:"unanswered",
 bank:n=>"Bank of "+n+" questions, answers shuffled on every attempt", examH:"Mock exam", examIntro:"Multiple-response questions say how many answers to choose. A question counts as correct only if every right answer is checked and nothing else.",
 numQ:"Number of questions", opt20:"20 questions (≈ 45 min)", opt40:"40 questions (≈ 91 min)", opt53:"53 questions (120 min, real format)", optAll:n=>"Whole bank ("+n+" questions)",
 mode:"Mode", modeExam:"Exam: timed, answers at the end", modePrac:"Practice: untimed, answer after each question", domains:"Domains", allD:"All, weighted like the official blueprint", onlyD:(d,name)=>"D"+d+" · "+name+" only", start:"Start",
 examTitle:n=>n+"-question mock exam", examD:d=>"D"+d+" exam",
 otherMocks:"Other mock exams", mock1:": 20/40/60 questions, exam and practice modes.", mock2:": probably targets the Architect exam, use as a supplement.",
 errEyebrow:"A question leaves the list once you answer it correctly", errTitle:"Mistakes to review", errReview:n=>"Review the "+n+" question(s)", errQ:"Question", errNone:"No mistakes recorded yet. Take a domain quiz or a mock exam.", errRun:"Mistake review",
 trapEyebrow:"Typical wrong answers", trapTitle:"Exam traps", hTrap:"Trap", hReflex:"Right reflex", fmt:"Format to know",
 fmtItems:["53 single- or multiple-response questions, 120 minutes, about 2 min 15 per question.","Passing score: 720 on a 100 to 1000 scale, results per domain.","Pearson VUE, test center or online proctored, closed book.","Open to Claude Partner Network members only; USD 125 per attempt.","Retakes: wait 14, 30 then 90 days; 4 attempts maximum in 12 months.","Reschedule or cancel: at least 48 h ahead (Partner Academy FAQ; guide v1.0 says 24 h). English or Japanese.","Per-domain percentages are informational: only the overall score decides."]}
}
