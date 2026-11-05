// Contenu généré depuis la version HTML (4 nov. 2026). Modifier ici directement.
import type { BlueprintSkill, Lang, SheetText, Source } from './types'

export const BLUEPRINT: BlueprintSkill[] = [
  [1,"Architecture d'agent","Agent architecture",4.5],
  [1,"Construction d'agents avec Claude","Agent construction with Claude",5.3],
  [1,"Patterns et frameworks d'agents","Agent patterns and frameworks",4.9],
  [2,"Compréhension des exigences","Understanding requirements",3.4],
  [2,"Cycle de vie des systèmes","Systems life cycle",2.8],
  [2,"Mécanique de l'API Claude","Claude API mechanics",6.8],
  [2,"Bases du génie logiciel","Software engineering foundations",7.4],
  [2,"Conception d'applications Claude","Claude application design",8.6],
  [2,"Gestion de la configuration","Configuration management",4.1],
  [3,"Utilisation de Claude Code","Claude Code operation",3.1],
  [4,"Débogage et gestion d'erreurs","Debugging and error handling",2.6],
  [5,"Fondamentaux des LLM","LLM fundamentals",5.2],
  [5,"Fondamentaux techniques","Technical fundamentals",6.1],
  [5,"Choix de modèle et compromis","Model selection and tradeoffs",2.7],
  [5,"Gestion des coûts et des tokens","Cost and token management",2.8],
  [6,"Context engineering","Context engineering",3.8],
  [6,"Prompt engineering","Prompt engineering",4.6],
  [6,"Gestion des sorties","Output handling",2.6],
  [7,"Sécurité des applications IA","AI application security",3.2],
  [7,"Guardrails et déploiement sûr","Guardrails and safe deployment",2.3],
  [7,"Hooks Claude","Claude hooks",1],
  [7,"Identités, secrets et clés","Identity, secrets and key management",1.6],
  [8,"Implémentation d'outils","Tool implementation",4.4],
  [8,"Développement de serveurs MCP","MCP server development",2.1],
  [8,"Personnalisation agentique","Agentic customization",4.1]
]

export const SHEET_TXT: Record<Lang, SheetText> = {
 "fr": {
  "title": "Fiche de révision",
  "eyebrow": "Vérifiée le 4 novembre 2026",
  "fmt": "Format officiel (guide v1.0)",
  "bp": "Blueprint détaillé",
  "bpH": [
   "Domaine",
   "Compétence",
   "Poids"
  ],
  "rows": [
   [
    "Code",
    "CCDV-F"
   ],
   [
    "Questions",
    "53, choix unique ou multiple ; chaque question indique combien de réponses choisir"
   ],
   [
    "Durée",
    "120 minutes (≈ 2 min 15 par question)"
   ],
   [
    "Réussite",
    "720 sur 100–1000, standard fixe (pas de classement entre candidats)"
   ],
   [
    "Résultat",
    "Réussite ou échec, score, % par domaine (informatif)"
   ],
   [
    "Prix",
    "125 USD par tentative, remise selon le niveau de partenaire"
   ],
   [
    "Passage",
    "Pearson VUE, en ligne surveillé ou en centre ; sans notes ni second écran"
   ],
   [
    "Langues",
    "Anglais, japonais (FAQ)"
   ],
   [
    "Crédit partiel",
    "Non précisé : viser toutes les bonnes réponses"
   ],
   [
    "Report",
    "Au moins 48 h avant (FAQ) ; le guide dit 24 h"
   ],
   [
    "Repassage",
    "14, 30 puis 90 jours ; 4 tentatives max sur 12 mois ; plein tarif"
   ],
   [
    "Validité",
    "12 mois ; renouvellement gratuit en ligne avant expiration"
   ]
  ],
  "keysT": "Chiffres et paramètres",
  "keys": [
   "Batch : -50 %, < 1 h en général, 24 h max, 100 000 requêtes ou 256 Mo, résultats 29 jours, corrélation par custom_id",
   "Cache : ordre tools → system → messages ; 4 breakpoints ; TTL 5 min ou 1 h ; écriture 1,25× / 2× ; lecture 0,1× ; minimum 512 à 4096 tokens",
   "stop_reason : end_turn, max_tokens, stop_sequence, tool_use, pause_turn, refusal, model_context_window_exceeded",
   "Retry : 429, 500, 529 (504) avec backoff ; jamais 400, 401, 403, 404, 413 ; SDK : 2 retries par défaut",
   "Thinking : adaptatif + output_config.effort (low → max) ; budget_tokens ≥ 1024 et < max_tokens (manuel, 4.5) ; 400 sur 4.7+",
   "Prefill : 400 sur 4.6+ → structured outputs (output_config.format) ou strict: true",
   "tool_choice : auto, any, tool, none ; tool_result juste après, avant tout texte ; is_error: true",
   "Contexte : 1M tokens sur les modèles actuels ; sortie max 128K",
   "Fast mode : speed fast, ≈ 2,5× plus rapide, ≈ 2× le prix, pas en Batch",
   "Hooks : exit 2 bloque (stderr à Claude) ; exit 0 continue ; autre code non bloquant",
   "Settings : managed > --settings > settings.local.json > settings.json > ~/.claude/settings.json ; les CLAUDE.md se cumulent",
   "MCP : JSON-RPC 2.0 ; tools (modèle), resources (application), prompts (utilisateur) ; stdio, Streamable HTTP"
  ],
  "timeT": "Gestion du temps",
  "time": [
   "Premier passage ≈ 65 min : répondre, marquer les doutes",
   "Deuxième passage ≈ 35 min : questions marquées",
   "Dernières 20 min : relire les questions à réponses multiples (nombre de cases)",
   "Éliminer d'abord les pièges : modèle plus gros, température, consigne polie, plus d'outils"
  ],
  "srcT": "Sources vérifiées"
 },
 "en": {
  "title": "Cheat sheet",
  "eyebrow": "Checked on November 4, 2026",
  "fmt": "Official format (guide v1.0)",
  "bp": "Detailed blueprint",
  "bpH": [
   "Domain",
   "Skill",
   "Weight"
  ],
  "rows": [
   [
    "Code",
    "CCDV-F"
   ],
   [
    "Questions",
    "53, single or multiple response; each item says how many answers to pick"
   ],
   [
    "Time",
    "120 minutes (≈ 2 min 15 per item)"
   ],
   [
    "Pass",
    "720 on 100–1000, fixed standard (not graded on a curve)"
   ],
   [
    "Result",
    "Pass or fail, score, % per domain (informational)"
   ],
   [
    "Price",
    "USD 125 per attempt, discount by partner tier"
   ],
   [
    "Delivery",
    "Pearson VUE, online proctored or test center; no notes or second screen"
   ],
   [
    "Languages",
    "English, Japanese (FAQ)"
   ],
   [
    "Partial credit",
    "Not stated: aim for every right answer"
   ],
   [
    "Reschedule",
    "At least 48 h ahead (FAQ); the guide says 24 h"
   ],
   [
    "Retakes",
    "14, 30 then 90 days; 4 attempts max in 12 months; full fee"
   ],
   [
    "Validity",
    "12 months; free online renewal before expiry"
   ]
  ],
  "keysT": "Numbers and parameters",
  "keys": [
   "Batch: -50%, usually < 1 h, 24 h max, 100,000 requests or 256 MB, results kept 29 days, match by custom_id",
   "Cache: order tools → system → messages; 4 breakpoints; TTL 5 min or 1 h; write 1.25× / 2×; read 0.1×; minimum 512 to 4096 tokens",
   "stop_reason: end_turn, max_tokens, stop_sequence, tool_use, pause_turn, refusal, model_context_window_exceeded",
   "Retry: 429, 500, 529 (504) with backoff; never 400, 401, 403, 404, 413; SDK: 2 retries by default",
   "Thinking: adaptive + output_config.effort (low → max); budget_tokens ≥ 1024 and < max_tokens (manual, 4.5); 400 on 4.7+",
   "Prefill: 400 on 4.6+ → structured outputs (output_config.format) or strict: true",
   "tool_choice: auto, any, tool, none; tool_result right after, before any text; is_error: true",
   "Context: 1M tokens on current models; max output 128K",
   "Fast mode: speed fast, ≈ 2.5× faster, ≈ 2× the price, not in Batch",
   "Hooks: exit 2 blocks (stderr to Claude); exit 0 proceeds; other codes non-blocking",
   "Settings: managed > --settings > settings.local.json > settings.json > ~/.claude/settings.json; CLAUDE.md files add up",
   "MCP: JSON-RPC 2.0; tools (model), resources (application), prompts (user); stdio, Streamable HTTP"
  ],
  "timeT": "Time management",
  "time": [
   "First pass ≈ 65 min: answer, flag doubts",
   "Second pass ≈ 35 min: flagged items",
   "Last 20 min: recheck multiple-response items (number of boxes)",
   "Eliminate the traps first: bigger model, temperature, polite instruction, more tools"
  ],
  "srcT": "Sources checked"
 }
}

export const SOURCES: Source[] = [
  ["Guide d'examen officiel CCDV-F v1.0 / Official CCDV-F exam guide v1.0","https://anthropic-partners.skilljar.com/page/partner-certifications"],
  ["FAQ certifications (Partner Academy)","https://anthropic-partners.skilljar.com/page/faq-certifications"],
  ["Inscription CCDV-F / Registration","https://anthropic-partners.skilljar.com/claude-certified-developer-foundations-certification"],
  ["Parcours de préparation / Prep path","https://anthropic-partners.skilljar.com/path/claude-certified-developer-foundations"],
  ["Claude API docs","https://platform.claude.com/docs/en/build-with-claude/prompt-caching"],
  ["Claude Code docs","https://code.claude.com/docs/en/settings"],
  ["Agent SDK docs","https://code.claude.com/docs/en/agent-sdk/overview"],
  ["Model Context Protocol","https://modelcontextprotocol.io/docs/learn/architecture"],
  ["Building effective agents","https://www.anthropic.com/engineering/building-effective-agents"],
  ["Effective context engineering","https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"],
  ["Writing tools for agents","https://www.anthropic.com/engineering/writing-tools-for-agents"],
  ["preporato/claude-certification-guide","https://github.com/preporato/claude-certification-guide"],
  ["Amey-Thakur/CLAUDE-CERTIFICATIONS","https://github.com/Amey-Thakur/CLAUDE-CERTIFICATIONS/blob/main/developer-foundations/README.md"],
  ["codedevloper/claude-certification-zero-to-hero","https://github.com/codedevloper/claude-certification-zero-to-hero"],
  ["Pearson VUE (Anthropic)","https://www.pearsonvue.com/us/en/anthropic.html"]
]
