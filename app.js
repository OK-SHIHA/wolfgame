(function (global) {
  const ROLE_DEFINITIONS = {
    wolf: {
      label: "人狼",
      camp: "wolf",
      adjustable: true,
      defaultCount: 1,
      setupHelp: "夜に襲撃対象を選ぶ。仲間の人狼がわかる。",
      revealDescription: "人狼陣営。夜に襲撃対象を選びます。占い・霊媒では黒判定です。",
    },
    ablewolf: {
      label: "能ある人狼",
      camp: "wolf",
      adjustable: true,
      defaultCount: 0,
      setupHelp: "人狼陣営。夜に襲撃対象を選ぶか「襲撃しない」を選べる。占い/霊媒は黒判定。",
      revealDescription: "人狼陣営。占い・霊媒では黒判定です。夜に襲撃対象を選ぶか「襲撃しない」を選択できます。",
    },
    citizen: {
      label: "市民",
      camp: "citizen",
      adjustable: false,
      defaultCount: 0,
      setupHelp: "特殊能力なし。議論と投票で人狼を見つける。",
      revealDescription: "市民陣営。特殊能力はありません。議論と投票で人狼を見つけます。",
    },
    seer: {
      label: "占い師",
      camp: "citizen",
      adjustable: true,
      defaultCount: 0,
      setupHelp: "夜に1人を占い、白/黒を判定できる。",
      revealDescription: "市民陣営。夜に1人を占って白/黒を判定できます。",
    },
    sage: {
      label: "賢者",
      camp: "citizen",
      adjustable: true,
      defaultCount: 0,
      setupHelp: "占い師と同様に占えるが、占った相手の役職名がわかる。",
      revealDescription: "市民陣営。夜に1人を占って、その人の役職名を知ることができます。",
    },
    sorcerer: {
      label: "妖術師",
      camp: "wolf",
      adjustable: true,
      defaultCount: 0,
      setupHelp: "人狼陣営。賢者と同様に夜に1人を占い、役職名を知ることができる。占い・霊媒は白判定。",
      revealDescription: "人狼陣営。賢者と同様に夜に1人を占って役職名を知ることができます。占い・霊媒は白判定です。",
    },
    baker: {
      label: "パン屋",
      camp: "citizen",
      adjustable: true,
      defaultCount: 0,
      setupHelp: "生存中の朝に「美味しいパン」がアナウンスされる。",
      revealDescription: "市民陣営。生存中の朝に「美味しいパンが焼かれました。」と告知されます。",
    },
    medium: {
      label: "霊媒師",
      camp: "citizen",
      adjustable: true,
      defaultCount: 0,
      setupHelp: "夜に前日の処刑者を判定できる。",
      revealDescription: "市民陣営。夜に前日の処刑者を白/黒で判定できます。",
    },
    knight: {
      label: "騎士",
      camp: "citizen",
      adjustable: true,
      defaultCount: 0,
      setupHelp: "夜に1人を護衛し、人狼の襲撃を防げる。",
      revealDescription: "市民陣営。夜に1人を護衛し、襲撃を防げます。",
    },
    mayor: {
      label: "市長",
      camp: "citizen",
      adjustable: true,
      defaultCount: 0,
      setupHelp: "市民陣営。投票時に自分の票が2票分として集計される。",
      revealDescription: "市民陣営。特殊能力はありませんが、投票時は2票分として集計されます。",
    },
    nekomata: {
      label: "猫又",
      camp: "citizen",
      adjustable: true,
      defaultCount: 0,
      setupHelp: "市民陣営。投票処刑時は生存者1人、襲撃死時は人狼1人を道連れにする。占い・霊媒は白判定。",
      revealDescription: "市民陣営。投票で死亡すると生存者1人、襲撃で死亡すると人狼1人をランダムで道連れにします。占い・霊媒は白判定です。",
    },
    blackcat: {
      label: "黒猫",
      camp: "wolf",
      adjustable: true,
      defaultCount: 0,
      setupHelp: "人狼陣営。投票で死亡した時のみ、人狼以外の生存者1人を即時に道連れにする。占い・霊媒は白判定。",
      revealDescription: "人狼陣営。投票で死亡した時のみ、人狼以外の生存者1人をランダムで即時に道連れにします。襲撃死など投票以外では道連れは発生しません。占い・霊媒は白判定です。",
    },
    twin: {
      label: "双子",
      camp: "citizen",
      adjustable: true,
      defaultCount: 0,
      pairOnly: true,
      setupHelp: "2人1組。役職確認時と投票時に相方がわかる。",
      revealDescription: "市民陣営。2人1組で、相方の双子を把握できます。",
    },
    madman: {
      label: "狂人",
      camp: "wolf",
      adjustable: true,
      defaultCount: 0,
      setupHelp: "人狼陣営。能力はないが占い/霊媒では白判定。",
      revealDescription: "人狼陣営。特殊能力はありませんが、占い・霊媒では白判定です。",
    },
    fanatic: {
      label: "狂信者",
      camp: "wolf",
      adjustable: true,
      defaultCount: 0,
      setupHelp: "人狼陣営。人狼が誰かわかる（占い/霊媒は白判定）。",
      revealDescription: "人狼陣営。人狼が誰かわかりますが、人狼側には狂信者がわかりません。占い・霊媒は白判定です。",
    },
    psycho: {
      label: "サイコ",
      camp: "wolf",
      adjustable: true,
      defaultCount: 0,
      setupHelp: "人狼陣営。襲撃では死なないが、接触した行動者を翌朝死亡させる。",
      revealDescription: "人狼陣営。占い・霊媒は白判定です。夜にサイコへ関わった行動者は翌朝死亡し、サイコ自身は襲撃では死亡しません。",
    },
    whisperingmadman: {
      label: "ささやく狂人",
      camp: "wolf",
      adjustable: true,
      defaultCount: 0,
      setupHelp: "人狼陣営。人狼が誰かわかり、人狼側にもささやく狂人がわかる（占い/霊媒は白判定）。",
      revealDescription: "人狼陣営。人狼が誰かわかり、人狼側にもささやく狂人がわかります。占い・霊媒は白判定です。",
    },
  };

  const ROLE_ORDER = ["wolf", "ablewolf", "citizen", "seer", "sage", "baker", "medium", "knight", "mayor", "nekomata", "madman", "fanatic", "sorcerer", "blackcat", "psycho", "whisperingmadman", "twin"];
  const ADJUSTABLE_ROLES = ROLE_ORDER.filter((role) => ROLE_DEFINITIONS[role].adjustable);

  const ROLE_LABELS = Object.fromEntries(
    ROLE_ORDER.map((role) => [role, ROLE_DEFINITIONS[role].label]),
  );

  const ROLE_DESCRIPTIONS = Object.fromEntries(
    ROLE_ORDER.map((role) => [role, ROLE_DEFINITIONS[role].revealDescription]),
  );

  const TEST_MODE_SAMPLE_NAMES = ["一郎", "二郎", "三郎", "四郎", "五郎", "六郎", "七郎"];

  const WOLF_CONVERSATION_ACTION_CHOICES = ["に投票する", "を襲撃する", "を殺さない"];
  const WOLF_CONVERSATION_DECISION_CHOICES = ["YES", "NO", "任せる"];

  function createDefaultRoleCounts() {
    return Object.fromEntries(
      ROLE_ORDER.map((role) => [role, ROLE_DEFINITIONS[role].defaultCount]),
    );
  }

  function normalizeWolfConversationAction(action) {
    const normalized = String(action || "").trim();
    return WOLF_CONVERSATION_ACTION_CHOICES.includes(normalized) ? normalized : "";
  }

  function normalizeWolfConversationDecision(decision) {
    const normalized = String(decision || "").trim().toUpperCase();
    if (normalized === "YES") return "YES";
    if (normalized === "NO") return "NO";
    if (normalized === "任せる") return "任せる";
    return "";
  }

  function normalizeWolfConversationTargetName(targetName, participantNames) {
    const normalized = String(targetName || "").trim();
    const names = (participantNames || []).map((name) => String(name || ""));
    return names.includes(normalized) ? normalized : "";
  }

  function createWolfConversationMessage(authorName, targetName, action, decision, participantNames = []) {
    const normalizedTargetName = normalizeWolfConversationTargetName(targetName, participantNames);
    const normalizedAction = normalizeWolfConversationAction(action);
    const normalizedDecision = normalizeWolfConversationDecision(decision);
    if (!normalizedTargetName && !normalizedAction && !normalizedDecision) {
      return null;
    }
    return {
      authorName: String(authorName || ""),
      targetName: normalizedTargetName,
      action: normalizedAction,
      decision: normalizedDecision,
    };
  }

  function appendWolfConversationMessage(logEntries, entry) {
    if (!entry) {
      return [...(logEntries || [])];
    }
    return [...(logEntries || []), entry];
  }

  function clampNumber(value, min, max) {
    if (!Number.isFinite(value)) return min;
    return Math.max(min, Math.min(max, value));
  }

  function normalizePlayerName(name) {
    return String(name || "").trim();
  }

  function validateRoleCounts(totalPlayers, roleCounts) {
    const total = clampNumber(Number(totalPlayers), 1, 30);
    const normalized = {};
    ADJUSTABLE_ROLES.forEach((role) => {
      normalized[role] = clampNumber(Number(roleCounts[role]), 0, total);
    });
    const citizens = total - ADJUSTABLE_ROLES.reduce((sum, role) => sum + normalized[role], 0);
    normalized.citizen = citizens;

    const wolves = (normalized.wolf || 0) + (normalized.ablewolf || 0);
    const twins = normalized.twin;

    if (total < 3) {
      throw new Error("プレイヤーは3人以上必要です。");
    }
    if (wolves < 1) {
      throw new Error("人狼は1人以上にしてください。");
    }
    if (wolves * 2 >= total) {
      throw new Error("人狼は過半数以上にできません。");
    }
    if (citizens < 0) {
      throw new Error("配役数が多すぎます。市民がマイナスになっています。");
    }
    if (!(twins === 0 || twins === 2)) {
      throw new Error("双子は0人か2人のみ選択できます。");
    }

    return {
      counts: normalized,
      wolves,
      citizens,
      seers: normalized.seer,
      sages: normalized.sage,
      bakers: normalized.baker,
      mediums: normalized.medium,
      fanatics: normalized.fanatic,
      twins,
      total,
    };
  }

  function createRoleDeck(roleCounts) {
    const deck = [];
    ROLE_ORDER.forEach((role) => {
      for (let index = 0; index < (roleCounts[role] || 0); index += 1) {
        deck.push(role);
      }
    });
    return deck;
  }

  function shuffle(list, rng = Math.random) {
    const result = [...list];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(rng() * (index + 1));
      [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }
    return result;
  }

  function buildPlayers(playerNames, shuffledRoles) {
    return shuffledRoles.map((role, index) => ({
      id: index + 1,
      name: playerNames[index],
      role,
      alive: true,
    }));
  }

  function getVoteWeight(role) {
    return role === "mayor" ? 2 : 1;
  }

  function buildVoteTally(votesByVoter, players) {
    const byId = new Map((players || []).map((player) => [Number(player.id), player]));
    const tally = new Map();
    Object.entries(votesByVoter || {}).forEach(([voterId, targetId]) => {
      const voter = byId.get(Number(voterId)) || null;
      const target = byId.get(Number(targetId)) || null;
      if (!target) return;
      const weight = getVoteWeight(voter?.role);
      tally.set(Number(targetId), (tally.get(Number(targetId)) || 0) + weight);
    });
    return tally;
  }

  function isDivinationRole(role) {
    return role === "seer" || role === "sage" || role === "sorcerer";
  }

  function getDivinationResultText(actorRole, target) {
    if (!target) return "判定対象が見つかりません。";
    if (actorRole === "sage" || actorRole === "sorcerer") {
      const roleLabel = ROLE_LABELS[target.role] || target.role;
      return `${target.name}は${roleLabel}である。`;
    }
    const result = target.role === "wolf" || target.role === "ablewolf" ? "人狼" : "人狼ではない";
    return `${target.name}は${result}。`;
  }

  function collectPsychoDeathCandidatesFromDivinations(divinationChecksByVoter, players) {
    const byId = new Map((players || []).map((player) => [Number(player.id), player]));
    const candidates = new Set();
    Object.entries(divinationChecksByVoter || {}).forEach(([voterId, targetId]) => {
      const voter = byId.get(Number(voterId)) || null;
      const target = byId.get(Number(targetId)) || null;
      if (!voter || !voter.alive || !isDivinationRole(voter.role)) return;
      if (!target || !target.alive) return;
      if (target.role === "psycho") {
        candidates.add(voter.id);
      }
    });
    return Array.from(candidates).sort((left, right) => left - right);
  }

  function resolveNekomataVoteCompanion(executedPlayerId, players, rng = Math.random) {
    const executed = (players || []).find((player) => player.id === Number(executedPlayerId));
    if (!executed || executed.role !== "nekomata") return null;

    const aliveOthers = (players || []).filter((player) => player.alive && player.id !== executed.id);
    if (aliveOthers.length === 0) return null;
    const target = aliveOthers[Math.floor(rng() * aliveOthers.length)] || null;
    return target ? target.id : null;
  }

  function resolveNekomataNightCompanion(attackedPlayerId, players, rng = Math.random) {
    const attacked = (players || []).find((player) => player.id === Number(attackedPlayerId));
    if (!attacked || attacked.role !== "nekomata") return null;

    const aliveWolves = (players || []).filter((player) =>
      player.alive && (player.role === "wolf" || player.role === "ablewolf"),
    );
    if (aliveWolves.length === 0) return null;
    const target = aliveWolves[Math.floor(rng() * aliveWolves.length)] || null;
    return target ? target.id : null;
  }

  function resolveBlackcatVoteCompanion(executedPlayerId, players, rng = Math.random) {
    const executed = (players || []).find((player) => player.id === Number(executedPlayerId));
    if (!executed || executed.role !== "blackcat") return null;

    const aliveNonWolves = (players || []).filter((player) =>
      player.alive && player.id !== executed.id && player.role !== "wolf" && player.role !== "ablewolf",
    );
    if (aliveNonWolves.length === 0) return null;
    const target = aliveNonWolves[Math.floor(rng() * aliveNonWolves.length)] || null;
    return target ? target.id : null;
  }

  function formatTime(totalSeconds) {
    const safe = Math.max(0, Math.floor(totalSeconds));
    const minutes = String(Math.floor(safe / 60)).padStart(2, "0");
    const seconds = String(safe % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function evaluateWinner(players) {
    const alivePlayers = players.filter((player) => player.alive);
    const wolves = alivePlayers.filter((player) => player.role === "wolf" || player.role === "ablewolf").length;
    const citizens = alivePlayers.length - wolves;

    if (alivePlayers.length === 0) return "draw";
    if (wolves === 0) return "citizen";
    if (wolves >= citizens) return "wolf";
    return null;
  }

  const app = {
    normalizePlayerName,
    normalizeWolfConversationAction,
    normalizeWolfConversationDecision,
    normalizeWolfConversationTargetName,
    createWolfConversationMessage,
    appendWolfConversationMessage,
    validateRoleCounts,
    createRoleDeck,
    shuffle,
    buildPlayers,
    buildVoteTally,
    getDivinationResultText,
    collectPsychoDeathCandidatesFromDivinations,
    resolveNekomataVoteCompanion,
    resolveNekomataNightCompanion,
    resolveBlackcatVoteCompanion,
    formatTime,
    evaluateWinner,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = app;
  }

  if (typeof document !== "undefined") {
    const state = {
      names: [],
      players: [],
      revealIndex: 0,
      hasShownCurrent: false,
      setupRoleTotal: 0,
      gamePhase: "night",
      round: 1,
      nightZeroIndex: 0,
      nightZeroStarted: false,
      nightZeroSeerResultByPlayer: {},
      nightZeroSelectionByPlayer: {},
      pendingPsychoDeathIds: [],
      pendingNightVictimId: null,
      nightActionSelection: null,
      currentNightActorIndex: 0,
      nightActionStarted: false,
      nightActions: {
        wolfVotesByVoter: {},
        seerChecksByVoter: {},
        mediumChecksByVoter: {},
        knightProtectByVoter: {},
      },
      nightActionDoneByActor: {},
      nightActionResultByActor: {},
      selectedVoteCandidate: null,
      voteIdentityConfirmed: false,
      dayAnnouncement: "",
      votesByVoter: {},
      voteHistory: [],
      voteResultByRound: {},
      nightHistory: [],
      lastExecutedByVoteId: null,
      lastVoteAdditionalVictimId: null,
      currentVoterIndex: 0,
      tieCandidates: null,
      tieRound: 0,
      tieRule: "random",
      showVoteTally: false,
      firstDaySeerMode: "random-white",
      testMode: false,
      voteFinalized: false,
      gameWinner: null,
      knightConsecutiveGuard: "allowed",
      wolfConversation: "off",
      wolfTargetVisibility: "hide",
      voteWolfMessages: [],
      voteWolfMessageCommittedByPlayer: {},
      nightWolfMessageCommittedByPlayer: {},
      selectedWolfConversationTargetName: "",
      selectedWolfConversationAction: "",
      selectedWolfConversationDecision: "",
      phaseTimerSeconds: 120,
      phaseTimerLeft: 120,
      phaseTimerId: null,
      roleCounts: {
        ...createDefaultRoleCounts(),
      },
    };

    const playersCard = document.getElementById("players-card");
    const revealCard = document.getElementById("reveal-card");
    const gameCard = document.getElementById("game-card");
    const playersPreview = document.getElementById("players-preview");
    const finalPlayerList = document.getElementById("final-player-list"); // 現在は非表示
    const playersError = document.getElementById("players-error");
    const roleSetupSummary = document.getElementById("role-setup-summary");
    const finalSummary = document.getElementById("final-summary"); // 現在は非表示
    const gameStatus = document.getElementById("game-status");
    const roundBadge = document.getElementById("round-badge");
    const phaseBadge = document.getElementById("phase-badge");
    const nightZeroSection = document.getElementById("night-zero-section");
    const nightSection = document.getElementById("night-section");
    const daySection = document.getElementById("day-section");
    const voteSection = document.getElementById("vote-section");
    const endSection = document.getElementById("end-section");
    const nightQuestion = document.getElementById("night-question");
    const nightGuide = document.getElementById("night-guide");
    const nightActionButtons = document.getElementById("night-action-buttons");
    const nightActionResult = document.getElementById("night-action-result");
    const nightActionStartButton = document.getElementById("night-action-start");
    const nightActionDoneButton = document.getElementById("night-action-done");
    const confirmNightActionButton = document.getElementById("confirm-night-action");
    const nightZeroQuestion = document.getElementById("night-zero-question");
    const nightZeroGuide = document.getElementById("night-zero-guide");
    const nightZeroActionButtons = document.getElementById("night-zero-action-buttons");
    const nightZeroSeerResult = document.getElementById("night-zero-seer-result");
    const nightZeroStartButton = document.getElementById("night-zero-start");
    const nightZeroDoneButton = document.getElementById("night-zero-done");
    const dayAnnouncement = document.getElementById("day-announcement");
    const voteVoterLabel = document.getElementById("vote-voter-label");
    const voteRoleHint = document.getElementById("vote-role-hint");
    const voteWolfMessageLog = document.getElementById("vote-wolf-message-log");
    const voteCandidateButtons = document.getElementById("vote-candidate-buttons");
    const voteProgress = document.getElementById("vote-progress");
    const voteTally = document.getElementById("vote-tally");
    const voteNote = document.getElementById("vote-note");
    const toVotePhaseButton = document.getElementById("to-vote-phase");
    const startNightAfterVoteButton = document.getElementById("start-night-after-vote");
    const endTitle = document.getElementById("end-title");
    const winnerText = document.getElementById("winner-text");
    const alivePlayerList = document.getElementById("alive-player-list");
    const revealProgress = document.getElementById("reveal-progress");
    const revealMessage = document.getElementById("reveal-message");
    const roleName = document.getElementById("role-name");
    const roleDescription = document.getElementById("role-description");
    const revealActionButtons = document.getElementById("reveal-action-buttons");
    const showRoleButton = document.getElementById("show-role");
    const nextPlayerButton = document.getElementById("next-player");
    const playerNameInput = document.getElementById("player-name-input");
    const playerForm = document.getElementById("player-form");
    const citizenRoleGrid = document.getElementById("role-grid-citizen");
    const wolfRoleGrid = document.getElementById("role-grid-wolf");
    const roleCountViews = {};
    const roleAdjustButtonViews = {};

    function getWolfNames() {
      return state.players
        .filter((player) => player.role === "wolf" || player.role === "ablewolf")
        .map((player) => player.name);
    }

    function isTrueWolfRole(role) {
      return role === "wolf" || role === "ablewolf";
    }

    function isSeerBlackRole(role) {
      return role === "wolf" || role === "ablewolf";
    }

    function getWerewolfJudgementText(role) {
      return isSeerBlackRole(role) ? "人狼" : "人狼ではない";
    }

    function escapeHtml(value) {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function formatJudgementMessageHtml(message) {
      const escaped = escapeHtml(message || "");
      return escaped
        .replace(/人狼ではない|人狼/g, (matched) => {
          if (matched === "人狼ではない") {
            return '<span class="judge-not-wolf">人狼ではない</span>';
          }
          return '<span class="judge-wolf">人狼</span>';
        })
        .replace(/\n/g, "<br>");
    }

    function setJudgementMessage(element, message) {
      if (!element) return;
      element.innerHTML = formatJudgementMessageHtml(message);
    }

    function renderWolfTeamHint(targetElement, role, viewerId = null) {
      if (!targetElement) return;
      if (role !== "wolf" && role !== "ablewolf" && role !== "fanatic" && role !== "whisperingmadman") {
        targetElement.textContent = "";
        targetElement.classList.add("hidden");
        return;
      }
      const wolves = state.players
        .filter((player) => player.role === "wolf")
        .filter((player) => !isTrueWolfRole(role) || player.id !== viewerId)
        .map((player) => player.name);
      const ableWolves = state.players
        .filter((player) => player.role === "ablewolf")
        .filter((player) => !isTrueWolfRole(role) || player.id !== viewerId)
        .map((player) => player.name);
      const hasOtherAbleWolves = ableWolves.length > 0;

      const allTrueWolves = [...wolves, ...ableWolves];
      
      const whisperingMadmen = state.players.filter((player) => player.role === "whisperingmadman");
      const hasWhisperingMadman = whisperingMadmen.length > 0;
      const visibleWhisperingMadmen = whisperingMadmen
        .filter((player) => role !== "whisperingmadman" || player.id !== viewerId)
        .map((player) => player.name);
      const lines = [];

      if (role === "wolf" || role === "ablewolf") {
        if (wolves.length > 0) {
          lines.push(`人狼: ${wolves.join("、")}`);
        }
        if (hasOtherAbleWolves) {
          lines.push(`能ある人狼: ${ableWolves.join("、")}`);
        }
        if (hasWhisperingMadman) {
          const whisperingText = whisperingMadmen.map((player) => player.name).join("、");
          lines.push(`ささやく狂人: ${whisperingText}`);
        }
      } else if (role === "fanatic") {
        if (allTrueWolves.length > 0) {
          lines.push(`人狼: ${allTrueWolves.join("、")}`);
        }
      } else if (role === "whisperingmadman") {
        if (allTrueWolves.length > 0) {
          lines.push(`人狼: ${allTrueWolves.join("、")}`);
        }
        if (visibleWhisperingMadmen.length > 0) {
          lines.push(`ささやく狂人: ${visibleWhisperingMadmen.join("、")}`);
        }
      }

      if (lines.length === 0) {
        targetElement.textContent = "";
        targetElement.classList.add("hidden");
        return;
      }

      targetElement.textContent = lines.join("\n");
      targetElement.classList.remove("hidden");
    }
    const decideRolesButton = document.getElementById("decide-roles");
    const decreasePhaseSecondsButton = document.getElementById("decrease-phase-seconds");
    const increasePhaseSecondsButton = document.getElementById("increase-phase-seconds");
    const phaseTimerDisplay = document.getElementById("phase-timer-display");
    const setupTieRuleSelect = document.getElementById("setup-tie-rule");
    const setupShowVoteTallySelect = document.getElementById("setup-show-vote-tally");
    const setupFirstDaySeerSelect = document.getElementById("setup-first-day-seer");
    const setupKnightConsecutiveGuardSelect = document.getElementById("setup-knight-consecutive-guard");
    const setupWolfConversationSelect = document.getElementById("setup-wolf-conversation");
    const setupWolfTargetVisibilitySelect = document.getElementById("setup-wolf-target-visibility");
    const setupTestModeCheckbox = document.getElementById("setup-test-mode");
    const timerHeading = document.getElementById("timer-heading");
    const timerRow = document.querySelector(".timer-row");

    function getOtherWolvesTargetText(sourceMap, viewerId) {
      const rows = Object.entries(sourceMap)
        .map(([voterId, targetId]) => ({
          voter: findPlayerById(Number(voterId)),
          targetId,
          target: Number.isFinite(Number(targetId)) ? findPlayerById(Number(targetId)) : null,
        }))
        .filter(({ voter }) => voter && voter.alive)
        .filter(({ voter }) => isTrueWolfRole(voter.role) && voter.id !== viewerId)
        .map(({ voter, targetId, target }) => {
          if (targetId === "skip") {
            return `${voter.name}→襲撃しない`;
          }
          if (!target || !target.alive) return null;
          return `${voter.name}→${target.name}`;
        })
        .filter(Boolean);
      if (rows.length === 0) return "なし";
      return rows.join("、");
    }

    function isWolfConversationRole(role) {
      return role === "wolf" || role === "ablewolf" || role === "whisperingmadman";
    }

    function getWolfConversationMessagesText() {
      if (!state.voteWolfMessages || state.voteWolfMessages.length === 0) {
        return "なし";
      }
      return state.voteWolfMessages
        .map((entry, index) => {
          const targetText = entry.targetName || "";
          const actionText = entry.action || "";
          const decisionText = entry.decision || "";
          return `${index + 1}. ${entry.authorName}: ${targetText}${actionText} ${decisionText}`;
        })
        .join("\n");
    }

    function resetWolfConversationSelections() {
      state.selectedWolfConversationTargetName = "";
      state.selectedWolfConversationAction = "";
      state.selectedWolfConversationDecision = "";
    }

    function buildSelectWithNone(options, selectedValue, onChange) {
      const select = document.createElement("select");

      const noneOption = document.createElement("option");
      noneOption.value = "";
      noneOption.textContent = "";
      select.appendChild(noneOption);

      options.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
      });

      select.value = selectedValue || "";
      select.addEventListener("change", () => {
        onChange(select.value);
      });

      return select;
    }

    function renderWolfConversationComposer(container, actorName, onSaved) {
      const participantNames = state.players.map((player) => player.name);

      if (!normalizeWolfConversationTargetName(state.selectedWolfConversationTargetName, participantNames)) {
        state.selectedWolfConversationTargetName = "";
      }
      if (!normalizeWolfConversationAction(state.selectedWolfConversationAction)) {
        state.selectedWolfConversationAction = "";
      }
      if (!normalizeWolfConversationDecision(state.selectedWolfConversationDecision)) {
        state.selectedWolfConversationDecision = "";
      }

      const title = document.createElement("p");
      title.className = "hint message-title-inline";
      title.textContent = "メッセージ";
      container.appendChild(title);

      const composerRow = document.createElement("div");
      composerRow.className = "row wrap wolf-message-composer";

      const targetSelect = buildSelectWithNone(
        participantNames,
        state.selectedWolfConversationTargetName,
        (value) => {
          state.selectedWolfConversationTargetName = value;
          onSaved();
        },
      );
      composerRow.appendChild(targetSelect);

      const actionSelect = buildSelectWithNone(
        WOLF_CONVERSATION_ACTION_CHOICES,
        state.selectedWolfConversationAction,
        (value) => {
          state.selectedWolfConversationAction = value;
          onSaved();
        },
      );
      composerRow.appendChild(actionSelect);

      const decisionSelect = buildSelectWithNone(
        WOLF_CONVERSATION_DECISION_CHOICES,
        state.selectedWolfConversationDecision,
        (value) => {
          state.selectedWolfConversationDecision = value;
          onSaved();
        },
      );
      composerRow.appendChild(decisionSelect);

      container.appendChild(composerRow);
    }

    function commitWolfConversationMessageForActor(actor, phase) {
      if (!actor || !isWolfConversationRole(actor.role)) return;
      if (state.wolfConversation !== "on") return;

      const committedMap = phase === "night"
        ? state.nightWolfMessageCommittedByPlayer
        : state.voteWolfMessageCommittedByPlayer;
      if (committedMap[actor.id]) return;

      const entry = createWolfConversationMessage(
        actor.name,
        state.selectedWolfConversationTargetName,
        state.selectedWolfConversationAction,
        state.selectedWolfConversationDecision,
        state.players.map((player) => player.name),
      );
      if (!entry) {
        resetWolfConversationSelections();
        return;
      }

      state.voteWolfMessages = appendWolfConversationMessage(state.voteWolfMessages, {
        ...entry,
        phase,
        authorId: actor.id,
      });
      committedMap[actor.id] = true;
      resetWolfConversationSelections();
    }

    function createCounterBox(role) {
      const definition = ROLE_DEFINITIONS[role];
      const box = document.createElement("div");
      box.className = "counter-box";

      const title = document.createElement("span");
      title.textContent = definition.label;
      box.appendChild(title);

      const row = document.createElement("div");
      row.className = "counter-row";

      if (definition.adjustable) {
        const minusButton = document.createElement("button");
        minusButton.type = "button";
        minusButton.className = "mini ghost";
        minusButton.textContent = "−";
        minusButton.dataset.roleAction = "minus";
        minusButton.dataset.role = role;
        row.appendChild(minusButton);
        roleAdjustButtonViews[role] = roleAdjustButtonViews[role] || {};
        roleAdjustButtonViews[role].minus = minusButton;
      }

      const count = document.createElement("strong");
      count.textContent = String(state.roleCounts[role] || 0);
      row.appendChild(count);
      roleCountViews[role] = count;

      if (definition.adjustable) {
        const plusButton = document.createElement("button");
        plusButton.type = "button";
        plusButton.className = "mini";
        plusButton.textContent = "＋";
        plusButton.dataset.roleAction = "plus";
        plusButton.dataset.role = role;
        row.appendChild(plusButton);
        roleAdjustButtonViews[role] = roleAdjustButtonViews[role] || {};
        roleAdjustButtonViews[role].plus = plusButton;
      } else {
        const autoLabel = document.createElement("span");
        autoLabel.className = "hint";
        autoLabel.textContent = "自動調整";
        row.appendChild(autoLabel);
      }

      box.appendChild(row);

      const help = document.createElement("p");
      help.className = "role-help";
      help.textContent = definition.setupHelp;
      box.appendChild(help);

      return box;
    }

    function renderRoleSetupControls() {
      if (!citizenRoleGrid || !wolfRoleGrid) return;
      citizenRoleGrid.innerHTML = "";
      wolfRoleGrid.innerHTML = "";
      ROLE_ORDER.forEach((role) => {
        const box = createCounterBox(role);
        const camp = ROLE_DEFINITIONS[role].camp;
        if (camp === "wolf") {
          wolfRoleGrid.appendChild(box);
          return;
        }
        citizenRoleGrid.appendChild(box);
      });
    }

    function setScreen(phase) {
      playersCard.classList.toggle("hidden", phase !== "players");
      revealCard.classList.toggle("hidden", phase !== "reveal");
      gameCard.classList.toggle("hidden", phase !== "game");
    }

    function getAlivePlayers() {
      return state.players.filter((player) => player.alive);
    }

    function findPlayerById(playerId) {
      return state.players.find((player) => player.id === playerId) || null;
    }

    function addPendingPsychoDeath(playerId) {
      if (!playerId) return;
      if (!state.pendingPsychoDeathIds.includes(playerId)) {
        state.pendingPsychoDeathIds.push(playerId);
      }
    }

    function renderPlayersPreview() {
      playersPreview.innerHTML = "";
      state.names.forEach((name, index) => {
        const item = document.createElement("li");

        const left = document.createElement("span");
        left.textContent = `${index + 1}. ${name}`;

        const actions = document.createElement("div");
        actions.className = "player-actions";

        const upButton = document.createElement("button");
        upButton.type = "button";
        upButton.textContent = "↑";
        upButton.className = "mini ghost";
        upButton.disabled = index === 0;
        upButton.addEventListener("click", () => {
          const copy = [...state.names];
          [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
          state.names = copy;
          renderPlayersPreview();
        });

        const downButton = document.createElement("button");
        downButton.type = "button";
        downButton.textContent = "↓";
        downButton.className = "mini ghost";
        downButton.disabled = index === state.names.length - 1;
        downButton.addEventListener("click", () => {
          const copy = [...state.names];
          [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]];
          state.names = copy;
          renderPlayersPreview();
        });

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "削除";
        removeButton.className = "mini ghost";
        removeButton.addEventListener("click", () => {
          state.names = state.names.filter((_playerName, playerIndex) => playerIndex !== index);
          renderPlayersPreview();
        });

        actions.appendChild(upButton);
        actions.appendChild(downButton);
        actions.appendChild(removeButton);
        item.appendChild(left);
        item.appendChild(actions);
        playersPreview.appendChild(item);
      });

      decideRolesButton.disabled = state.names.length < 3;
      roleSetupSummary.textContent = `プレイヤー数: ${state.names.length}人`;
    }

    function getRoleTotal() {
      return ROLE_ORDER.reduce((sum, role) => sum + (state.roleCounts[role] || 0), 0);
    }

    function renderRoleCounters() {
      const autoCitizen = state.names.length
        - ADJUSTABLE_ROLES.reduce((sum, role) => sum + (state.roleCounts[role] || 0), 0);
      state.roleCounts.citizen = autoCitizen;
      ROLE_ORDER.forEach((role) => {
        const countValue = state.roleCounts[role] || 0;
        if (roleCountViews[role]) {
          roleCountViews[role].textContent = String(countValue);
        }

        const adjustViews = roleAdjustButtonViews[role];
        if (adjustViews?.minus) {
          adjustViews.minus.classList.remove("hidden");
          adjustViews.minus.classList.toggle("counter-control-hidden", countValue <= 0);
        }
        if (adjustViews?.plus) {
          const shouldHidePlus = role === "twin" && countValue >= 2;
          adjustViews.plus.classList.remove("hidden");
          adjustViews.plus.classList.toggle("counter-control-hidden", shouldHidePlus);
        }
      });
      if (roleCountViews.citizen) {
        roleCountViews.citizen.classList.toggle("danger", autoCitizen < 0);
      }
      state.setupRoleTotal = getRoleTotal();
    }

    function adjustRoleCount(role, delta) {
      if (ROLE_DEFINITIONS[role]?.pairOnly) {
        const currentValue = state.roleCounts[role] || 0;
        const nextValue = delta > 0 ? 2 : 0;
        state.roleCounts[role] = currentValue === nextValue ? currentValue : nextValue;
        renderRoleCounters();
        return;
      }
      const current = state.roleCounts[role];
      const next = Math.max(0, current + delta);
      state.roleCounts[role] = next;
      renderRoleCounters();
    }

    function renderRoleSetupSummary() {
      roleSetupSummary.textContent = `プレイヤー数: ${state.names.length}人`;
      renderRoleCounters();
    }

    function renderFinalSummary() {
      if (finalSummary) {
        const summary = ROLE_ORDER
          .map((role) => {
            const count = state.players.filter((player) => player.role === role).length;
            return `${ROLE_LABELS[role]} ${count}人`;
          })
          .join(" / ");
        finalSummary.textContent = summary;
      }

      if (finalPlayerList) {
        finalPlayerList.innerHTML = "";
        state.players.forEach((player, index) => {
          const item = document.createElement("li");
          item.textContent = `${index + 1}. ${player.name}`;
          finalPlayerList.appendChild(item);
        });
      }
    }

    function renderAlivePlayers() {
      alivePlayerList.innerHTML = "";
      const alive = getAlivePlayers();
      alive.forEach((player) => {
        const item = document.createElement("li");
        item.textContent = state.testMode
          ? `${player.name}（${ROLE_LABELS[player.role]}）`
          : player.name;
        alivePlayerList.appendChild(item);
      });
    }

    function renderVictims() {
      const victimsSection = document.getElementById("victims-list");
      if (!victimsSection) return;
      victimsSection.innerHTML = "";
      const nameOrderIndex = new Map(
        state.names.map((name, index) => [name, index]),
      );
      const victims = state.players
        .filter((player) => !player.alive)
        .sort((left, right) => {
          const leftIndex = nameOrderIndex.has(left.name)
            ? nameOrderIndex.get(left.name)
            : Number.MAX_SAFE_INTEGER;
          const rightIndex = nameOrderIndex.has(right.name)
            ? nameOrderIndex.get(right.name)
            : Number.MAX_SAFE_INTEGER;
          return leftIndex - rightIndex;
        });
      if (victims.length === 0) {
        victimsSection.textContent = "犠牲者なし";
        return;
      }
      victims.forEach((player) => {
        const item = document.createElement("li");
        item.textContent = state.testMode
          ? `${player.name}（${ROLE_LABELS[player.role]}）`
          : player.name;
        victimsSection.appendChild(item);
      });
    }

    function updatePhaseTimerUI() {
      phaseTimerDisplay.textContent = formatTime(state.phaseTimerLeft);
      phaseTimerDisplay.classList.toggle("time-up", state.phaseTimerLeft <= 0);
    }

    function stopPhaseTimer() {
      if (!state.phaseTimerId) return;
      clearInterval(state.phaseTimerId);
      state.phaseTimerId = null;
    }

    function startPhaseTimer() {
      if (state.phaseTimerId) return;
      state.phaseTimerId = setInterval(() => {
        state.phaseTimerLeft -= 1;
        updatePhaseTimerUI();
        if (state.phaseTimerLeft <= 0) {
          stopPhaseTimer();
          state.phaseTimerLeft = 0;
          updatePhaseTimerUI();
          gameStatus.textContent = "タイマー終了！";
        }
      }, 1000);
    }

    function resetPhaseTimer() {
      stopPhaseTimer();
      state.phaseTimerLeft = state.phaseTimerSeconds;
      updatePhaseTimerUI();
    }

    function adjustPhaseTimerSeconds(deltaSeconds) {
      state.phaseTimerSeconds = clampNumber(state.phaseTimerSeconds + deltaSeconds, 10, 60 * 30);
      resetPhaseTimer();
    }

    function setGamePhase(phase) {
      state.gamePhase = phase;
      nightZeroSection.classList.toggle("hidden", phase !== "night0");
      nightSection.classList.toggle("hidden", phase !== "night");
      daySection.classList.toggle("hidden", phase !== "day");
      voteSection.classList.toggle("hidden", phase !== "vote");
      endSection.classList.toggle("hidden", phase !== "ended");
      if (timerHeading) {
        timerHeading.classList.toggle("hidden", phase === "ended");
      }
      if (timerRow) {
        timerRow.classList.toggle("hidden", phase === "ended");
      }
      const labels = {
        night0: "1日目夜",
        night: "夜フェーズ",
        day: "朝フェーズ",
        vote: "投票フェーズ",
        ended: "ゲーム終了",
      };
      phaseBadge.textContent = labels[phase];
    }

    function updateGameStatus(message) {
      roundBadge.textContent = `${state.round}日目`;
      gameStatus.textContent = message;
      renderAlivePlayers();
      renderVictims();
    }

    function checkWinnerAndEnd() {
      const winner = evaluateWinner(state.players);
      if (!winner) return false;
      // 勝利が決定した - ただし、まだ画面は表示しない
      state.gameWinner = winner;
      return true;
    }

    function displayGameEnd() {
      const winner = state.gameWinner;
      setGamePhase("ended");
      winnerText.classList.remove("hidden");
      if (endTitle) {
        endTitle.classList.remove("winner-citizen", "winner-wolf", "winner-draw");
      }
      if (winner === "draw") {
        if (endTitle) {
          endTitle.textContent = "引き分け";
          endTitle.classList.add("winner-draw");
        }
        winnerText.textContent = "勝者: なし（全員死亡）";
      } else if (winner === "wolf") {
        if (endTitle) {
          endTitle.textContent = "人狼側の勝利";
          endTitle.classList.add("winner-wolf");
        }
        const winners = state.players
          .filter((player) => player.role === "wolf" || player.role === "ablewolf" || player.role === "madman" || player.role === "fanatic" || player.role === "psycho" || player.role === "whisperingmadman")
          .map((player) => player.name);
        winnerText.textContent = `勝者: ${winners.join("、")}`;
      } else {
        if (endTitle) {
          endTitle.textContent = "市民側の勝利";
          endTitle.classList.add("winner-citizen");
        }
        const winners = state.players
          .filter((player) => player.role !== "wolf" && player.role !== "ablewolf" && player.role !== "madman" && player.role !== "fanatic" && player.role !== "psycho" && player.role !== "whisperingmadman")
          .map((player) => player.name);
        winnerText.textContent = `勝者: ${winners.join("、")}`;
      }
      renderGameEndDetails();
      updateGameStatus("勝利条件を満たしたためゲーム終了です。");
    }

    function renderGameEndDetails() {
      const endDetailsSection = document.getElementById("end-details");
      if (!endDetailsSection) return;
      endDetailsSection.innerHTML = "";

      const voteHistoryByRound = new Map();
      state.voteHistory.forEach((vote) => {
        if (!voteHistoryByRound.has(vote.round)) {
          voteHistoryByRound.set(vote.round, []);
        }
        voteHistoryByRound.get(vote.round).push(vote);
      });

      // 役職表示
      const rolesHeading = document.createElement("h4");
      rolesHeading.textContent = "全員の役職";
      endDetailsSection.appendChild(rolesHeading);

      const rolesList = document.createElement("ul");
      rolesList.className = "end-details-list";
      state.players.forEach((player) => {
        const item = document.createElement("li");
        const status = player.alive ? "生存" : "犠牲";
        item.textContent = `${player.name}: ${ROLE_LABELS[player.role]} (${status})`;
        rolesList.appendChild(item);
      });
      endDetailsSection.appendChild(rolesList);

      // 投票結果（日毎）
      const votesHeading = document.createElement("h4");
      votesHeading.textContent = "投票先（日毎）";
      endDetailsSection.appendChild(votesHeading);

      const votesList = document.createElement("ul");
      votesList.className = "end-details-list";

      const voteRounds = Array.from(voteHistoryByRound.keys()).sort((left, right) => left - right);
      voteRounds.forEach((round) => {
        const rows = voteHistoryByRound.get(round) || [];
        const compactVotes = rows
          .map((vote) => `${vote.voterName}→${vote.targetName}`)
          .join(" / ");
        const resultText = state.voteResultByRound[round] || "結果記録なし";
        const item = document.createElement("li");
        item.textContent = `${round}日目: ${compactVotes} ｜ 結果: ${resultText}`;
        votesList.appendChild(item);
      });
      if (voteRounds.length === 0) {
        const item = document.createElement("li");
        item.textContent = "投票が行われていません";
        votesList.appendChild(item);
      }
      endDetailsSection.appendChild(votesList);

      // 襲撃ログ
      const wolfHeading = document.createElement("h4");
      wolfHeading.textContent = "襲撃先とその結果";
      endDetailsSection.appendChild(wolfHeading);

      const wolfList = document.createElement("ul");
      wolfList.className = "end-details-list";
      state.nightHistory.forEach((log) => {
        const item = document.createElement("li");
        const targetsText = log.wolfTargets.length > 0 ? log.wolfTargets.join(" / ") : "記録なし";
        item.textContent = `${log.round}日目夜: 襲撃先 ${targetsText} ｜ 結果: ${log.wolfResult}`;
        wolfList.appendChild(item);
      });
      if (state.nightHistory.length === 0) {
        const item = document.createElement("li");
        item.textContent = "襲撃ログはありません";
        wolfList.appendChild(item);
      }
      endDetailsSection.appendChild(wolfList);

      // 占いログ
      const seerHeading = document.createElement("h4");
      seerHeading.textContent = "占い先とその結果";
      endDetailsSection.appendChild(seerHeading);

      const seerList = document.createElement("ul");
      seerList.className = "end-details-list";
      const firstDaySeerLogs = state.players
        .filter((player) => isDivinationRole(player.role))
        .map((player) => ({
          player,
          result: state.nightZeroSeerResultByPlayer[player.id],
        }))
        .filter((entry) => entry.result);
      firstDaySeerLogs.forEach((entry) => {
        const item = document.createElement("li");
        item.textContent = "1日目夜(初日): "
          + `${entry.player.name}（${ROLE_LABELS[entry.player.role]}） ｜ 結果: ${entry.result}`;
        seerList.appendChild(item);
      });
      state.nightHistory.forEach((log) => {
        log.seerChecks.forEach((row) => {
          const item = document.createElement("li");
          item.textContent = `${log.round}日目夜: ${row.actorName}（${row.actorRoleLabel}） → ${row.targetName} ｜ 結果: ${row.result}`;
          seerList.appendChild(item);
        });
      });
      if (seerList.childElementCount === 0) {
        const item = document.createElement("li");
        item.textContent = "占いログはありません";
        seerList.appendChild(item);
      }
      endDetailsSection.appendChild(seerList);

      // 霊媒ログ
      const mediumHeading = document.createElement("h4");
      mediumHeading.textContent = "霊媒師の結果";
      endDetailsSection.appendChild(mediumHeading);

      const mediumList = document.createElement("ul");
      mediumList.className = "end-details-list";
      state.nightHistory.forEach((log) => {
        log.mediumChecks.forEach((row) => {
          const item = document.createElement("li");
          item.textContent = `${log.round}日目夜: ${row.actorName} ｜ 結果: ${row.result}`;
          mediumList.appendChild(item);
        });
      });
      if (mediumList.childElementCount === 0) {
        const item = document.createElement("li");
        item.textContent = "霊媒ログはありません";
        mediumList.appendChild(item);
      }
      endDetailsSection.appendChild(mediumList);
    }

    function buildNightHistoryLog(victims) {
      const wolfTargets = Object.entries(state.nightActions.wolfVotesByVoter)
        .map(([voterId, targetId]) => {
          const actor = findPlayerById(Number(voterId));
          if (!actor) return null;
          if (targetId === "skip") {
            return `${actor.name}→襲撃しない`;
          }
          const target = findPlayerById(Number(targetId));
          if (!target) return `${actor.name}→不明`;
          return `${actor.name}→${target.name}`;
        })
        .filter(Boolean);

      const seerChecks = Object.entries(state.nightActions.seerChecksByVoter)
        .map(([voterId, targetId]) => {
          const actor = findPlayerById(Number(voterId));
          const target = findPlayerById(Number(targetId));
          if (!actor || !target) return null;
          const result = state.nightActionResultByActor[actor.id] || getDivinationResultText(actor.role, target);
          return {
            actorName: actor.name,
            actorRoleLabel: ROLE_LABELS[actor.role],
            targetName: target.name,
            result,
          };
        })
        .filter(Boolean);

      const mediumChecks = Object.entries(state.nightActions.mediumChecksByVoter)
        .map(([voterId]) => {
          const actor = findPlayerById(Number(voterId));
          if (!actor) return null;
          const result = state.nightActionResultByActor[actor.id] || "結果なし";
          return {
            actorName: actor.name,
            result,
          };
        })
        .filter(Boolean);

      const wolfResult = victims.length > 0
        ? `犠牲者: ${victims.map((player) => player.name).join("、")}`
        : "犠牲者なし";

      state.nightHistory.push({
        round: state.round,
        wolfTargets,
        wolfResult,
        seerChecks,
        mediumChecks,
      });
    }

    function resetNightActions() {
      state.currentNightActorIndex = 0;
      state.nightActionStarted = false;
      state.nightActionSelection = null;
      state.pendingPsychoDeathIds = [];
      state.nightActions = {
        wolfVotesByVoter: {},
        seerChecksByVoter: {},
        mediumChecksByVoter: {},
        knightProtectByVoter: {},
      };
      state.nightActionDoneByActor = {};
      state.nightActionResultByActor = {};
      nightActionResult.innerHTML = "";
      confirmNightActionButton.classList.add("hidden");
    }

    function getNightCandidates(actor) {
      const alive = getAlivePlayers();
      if (isTrueWolfRole(actor.role)) {
        return alive.filter((player) => !isTrueWolfRole(player.role));
      }
      if (isDivinationRole(actor.role)) {
        return alive.filter((player) => player.id !== actor.id);
      }
      if (actor.role === "knight") {
        let candidates = alive.filter((player) => player.id !== actor.id);
        // 連続ガードが禁止の場合、前夜の護衛対象を除外
        if (state.knightConsecutiveGuard === "blocked") {
          const lastNightProtected = state.nightActions.knightProtectByVoter[actor.id];
          if (lastNightProtected) {
            candidates = candidates.filter((player) => player.id !== lastNightProtected);
          }
        }
        return candidates;
      }
      return [];
    }

    function selectNightTarget(actor, targetId) {
      const target = findPlayerById(targetId);
      if (!target || !target.alive || target.id === actor.id) return;

      if (isTrueWolfRole(actor.role)) {
        if (isTrueWolfRole(target.role)) return;
        state.nightActions.wolfVotesByVoter[actor.id] = target.id;
        state.nightActionResultByActor[actor.id] = `${target.name} を襲撃対象に選択しました。`;
        state.nightActionDoneByActor[actor.id] = true;
      }

      if (isDivinationRole(actor.role)) {
        state.nightActions.seerChecksByVoter[actor.id] = target.id;
        state.nightActionResultByActor[actor.id] = getDivinationResultText(actor.role, target);
        state.nightActionDoneByActor[actor.id] = true;
      }

      if (actor.role === "knight") {
        state.nightActions.knightProtectByVoter[actor.id] = target.id;
        state.nightActionResultByActor[actor.id] = `${target.name} を護衛対象に選択しました。`;
        state.nightActionDoneByActor[actor.id] = true;
      }

      state.nightActionSelection = null;
      nightActionDoneButton.disabled = false;
      renderNightStep();
    }

    function selectNightNoAttack(actor) {
      state.nightActions.wolfVotesByVoter[actor.id] = "skip";
      state.nightActionResultByActor[actor.id] = "襲撃しないを選択しました。";
      state.nightActionDoneByActor[actor.id] = true;
      state.nightActionSelection = null;
      nightActionDoneButton.disabled = false;
      renderNightStep();
    }

    function renderNightActionForActor(actor) {
      nightActionButtons.innerHTML = "";
      nightActionDoneButton.disabled = !state.nightActionDoneByActor[actor.id];
      const canSeeWolfConversation = state.wolfConversation === "on" && isWolfConversationRole(actor.role);
      const wolfConversationText = canSeeWolfConversation
        ? `メッセージログ:\n${getWolfConversationMessagesText()}`
        : "";

      if (state.nightActionDoneByActor[actor.id]) {
        nightGuide.textContent = "アクションは確定済みです。「夜アクション完了」で次へ進んでください。";
        return;
      }

      if (actor.role === "citizen" || actor.role === "mayor" || actor.role === "madman" || actor.role === "fanatic" || actor.role === "blackcat" || actor.role === "psycho" || actor.role === "whisperingmadman") {
        nightGuide.textContent = "ダミーアクションを実行してください。";
        if (actor.role === "fanatic") {
          const wolvesText = getWolfNames().join("、") || "なし";
          nightGuide.textContent = `人狼: ${wolvesText}。ダミーアクションを実行してください。`;
        }
        if (actor.role === "whisperingmadman") {
          const wolves = getWolfNames();
          const otherWhispering = state.players
            .filter((player) => player.role === "whisperingmadman" && player.id !== actor.id)
            .map((player) => player.name);
          const lines = [];
          if (wolves.length > 0) {
            lines.push(`人狼: ${wolves.join("、")}`);
          }
          if (otherWhispering.length > 0) {
            lines.push(`ささやく狂人: ${otherWhispering.join("、")}`);
          }
          lines.push("ダミーアクションを実行してください。");
          nightGuide.textContent = lines.join("\n");
          if (wolfConversationText) {
            nightGuide.textContent = `${nightGuide.textContent}\n${wolfConversationText}`;
          }
        }
        if (canSeeWolfConversation) {
          renderWolfConversationComposer(nightActionButtons, actor.name, () => {
            renderNightStep();
          });
        }
        const dummyButton = document.createElement("button");
        dummyButton.type = "button";
        dummyButton.textContent = "ダミーアクション完了";
        dummyButton.addEventListener("click", () => {
          state.nightActionResultByActor[actor.id] = "ダミーアクションを完了しました。";
          state.nightActionDoneByActor[actor.id] = true;
          renderNightStep();
        });
        nightActionButtons.appendChild(dummyButton);
        return;
      }

      if (actor.role === "medium") {
        nightGuide.textContent = "今朝の投票犠牲者を霊視します。";
        const checkButton = document.createElement("button");
        checkButton.type = "button";
        checkButton.textContent = "霊視結果を表示";
        checkButton.addEventListener("click", () => {
          if (!state.lastExecutedByVoteId) {
            state.nightActionResultByActor[actor.id] = "今朝の投票犠牲者がいないため、判定対象がありません。";
            state.nightActions.mediumChecksByVoter[actor.id] = null;
          } else {
            const target = findPlayerById(state.lastExecutedByVoteId);
            if (!target) {
              state.nightActionResultByActor[actor.id] = "判定対象が見つかりません。";
              state.nightActions.mediumChecksByVoter[actor.id] = null;
            } else {
              const result = getWerewolfJudgementText(target.role);
              state.nightActionResultByActor[actor.id] = `${target.name}は${result}。`;
              state.nightActions.mediumChecksByVoter[actor.id] = target.id;
            }
          }
          state.nightActionDoneByActor[actor.id] = true;
          renderNightStep();
        });
        nightActionButtons.appendChild(checkButton);
        return;
      }

      const candidates = getNightCandidates(actor);
      if (candidates.length === 0) {
        nightGuide.textContent = "有効な対象がいません。";
        state.nightActionDoneByActor[actor.id] = true;
        nightActionDoneButton.disabled = false;
        return;
      }

      if (isTrueWolfRole(actor.role)) {
        nightGuide.textContent = "襲撃対象を選んでください。";
        if (state.wolfTargetVisibility === "show") {
          const otherTargetsText = getOtherWolvesTargetText(state.nightActions.wolfVotesByVoter, actor.id);
          nightGuide.textContent = `襲撃対象を選んでください。\n他の人狼の襲撃先: ${otherTargetsText}`;
        }
        if (wolfConversationText) {
          nightGuide.textContent = `${nightGuide.textContent}\n${wolfConversationText}`;
        }
      }
      if (isDivinationRole(actor.role)) {
        nightGuide.textContent = "占い対象を選んでください。";
      }
      if (actor.role === "knight") {
        if (state.knightConsecutiveGuard === "blocked") {
          const lastNightProtected = state.nightActions.knightProtectByVoter[actor.id];
          if (lastNightProtected) {
            const lastProtected = findPlayerById(lastNightProtected);
            nightGuide.textContent = `護衛対象を選んでください。（${lastProtected.name}以外）`;
          } else {
            nightGuide.textContent = "護衛対象を選んでください。";
          }
        } else {
          nightGuide.textContent = "護衛対象を選んでください。";
        }
      }

      candidates.forEach((candidate) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = candidate.name;
        if (state.nightActionSelection === candidate.id) {
          button.classList.add("selected");
        }
        button.addEventListener("click", () => {
          state.nightActionSelection = candidate.id;
          renderNightStep();
        });
        nightActionButtons.appendChild(button);
      });

      if (isDivinationRole(actor.role) || actor.role === "knight" || isTrueWolfRole(actor.role)) {
        const actionButton = document.createElement("button");
        actionButton.type = "button";
        actionButton.textContent = isDivinationRole(actor.role)
          ? "占う"
          : actor.role === "knight"
            ? "護衛する"
            : "襲撃する";
        actionButton.disabled = !state.nightActionSelection;
        actionButton.addEventListener("click", () => {
          if (!state.nightActionSelection) return;
          selectNightTarget(actor, state.nightActionSelection);
        });
        nightActionButtons.appendChild(actionButton);

        if (state.nightActionSelection) {
          const resetButton = document.createElement("button");
          resetButton.type = "button";
          resetButton.className = "ghost";
          resetButton.textContent = "選び直す";
          resetButton.addEventListener("click", () => {
            state.nightActionSelection = null;
            renderNightStep();
          });
          nightActionButtons.appendChild(resetButton);
        }
      }

      if (actor.role === "ablewolf") {
        const noAttackButton = document.createElement("button");
        noAttackButton.type = "button";
        noAttackButton.className = "ghost";
        noAttackButton.textContent = "襲撃しない";
        noAttackButton.addEventListener("click", () => {
          selectNightNoAttack(actor);
        });
        nightActionButtons.appendChild(noAttackButton);
      }

      if (canSeeWolfConversation) {
        renderWolfConversationComposer(nightActionButtons, actor.name, () => {
          renderNightStep();
        });
      }
    }

    function renderNightStep() {
      const actors = getAlivePlayers();
      const current = actors[state.currentNightActorIndex];

      if (!current) {
        nightQuestion.textContent = "全員の夜アクションが完了しました。";
        nightGuide.textContent = "夜フェーズを確定して朝へ進んでください。";
        nightActionButtons.innerHTML = "";
        nightActionResult.innerHTML = "";
        nightActionStartButton.disabled = true;
        nightActionDoneButton.disabled = true;
        confirmNightActionButton.classList.remove("hidden");
        return;
      }

      confirmNightActionButton.classList.add("hidden");
      nightQuestion.textContent = `${current.name}さんですか？`;
      nightActionButtons.innerHTML = "";
      setJudgementMessage(nightActionResult, state.nightActionResultByActor[current.id] || "");

      if (!state.nightActionStarted) {
        nightGuide.textContent = "本人なら、夜アクションを開始してください。";
        nightActionStartButton.disabled = false;
        nightActionDoneButton.disabled = true;
        return;
      }

      nightQuestion.textContent = `${current.name}さんの役職: ${ROLE_LABELS[current.role]}`;
      nightActionStartButton.disabled = true;
      renderNightActionForActor(current);
    }

    function resolveNightActions() {
      const wolfVotes = Object.values(state.nightActions.wolfVotesByVoter)
        .map((targetId) => Number(targetId))
        .filter((targetId) => Number.isFinite(targetId));
      let selectedVictimId = null;
      const psychoDeathCandidates = new Set();

      if (wolfVotes.length > 0) {
        const tally = new Map();
        wolfVotes.forEach((targetId) => {
          tally.set(targetId, (tally.get(targetId) || 0) + 1);
        });
        const maxVotes = Math.max(...tally.values());
        const tied = Array.from(tally.entries())
          .filter((entry) => entry[1] === maxVotes)
          .map((entry) => Number(entry[0]));
        selectedVictimId = tied[Math.floor(Math.random() * tied.length)] || null;
      }

      const divinationPsychoDeaths = collectPsychoDeathCandidatesFromDivinations(
        state.nightActions.seerChecksByVoter,
        state.players,
      );
      divinationPsychoDeaths.forEach((playerId) => psychoDeathCandidates.add(playerId));

      Object.entries(state.nightActions.knightProtectByVoter).forEach(([voterId, targetId]) => {
        const voter = findPlayerById(Number(voterId));
        const target = findPlayerById(Number(targetId));
        if (!voter || !voter.alive || !target || !target.alive) return;
        if (target.role === "psycho") {
          psychoDeathCandidates.add(voter.id);
        }
      });

      const selectedVictim = findPlayerById(selectedVictimId);
      if (selectedVictim && selectedVictim.alive && selectedVictim.role === "psycho") {
        // サイコが襲撃対象に選ばれた場合、人狼全体からランダムに1体が死亡
        const aliveWolves = state.players.filter((player) => player.alive && isTrueWolfRole(player.role));
        if (aliveWolves.length > 0) {
          const randomWolf = aliveWolves[Math.floor(Math.random() * aliveWolves.length)];
          psychoDeathCandidates.add(randomWolf.id);
        }
        state.pendingNightVictimId = null;
      } else {
        const protectedIds = new Set(Object.values(state.nightActions.knightProtectByVoter).map(Number));
        if (selectedVictimId && protectedIds.has(selectedVictimId)) {
          state.pendingNightVictimId = null;
        } else {
          state.pendingNightVictimId = selectedVictimId;
        }
      }

      if (state.pendingNightVictimId) {
        const pendingVictim = findPlayerById(state.pendingNightVictimId);
        if (pendingVictim && pendingVictim.alive && pendingVictim.role === "nekomata") {
          const companionId = resolveNekomataNightCompanion(pendingVictim.id, state.players);
          if (companionId) {
            psychoDeathCandidates.add(companionId);
          }
        }
      }

      state.pendingPsychoDeathIds = Array.from(psychoDeathCandidates);
    }

    function applyNightResult() {
      const victimIds = new Set();
      if (state.pendingNightVictimId) {
        victimIds.add(Number(state.pendingNightVictimId));
      }
      state.pendingPsychoDeathIds.forEach((playerId) => {
        victimIds.add(Number(playerId));
      });

      const victims = Array.from(victimIds)
        .map((playerId) => findPlayerById(playerId))
        .filter((player) => player && player.alive);
      victims.forEach((player) => {
        player.alive = false;
      });

      if (victims.length > 0) {
        state.dayAnnouncement = `昨晩の犠牲者: ${victims.map((player) => player.name).join("、")}`;
      } else {
        state.dayAnnouncement = "昨晩の犠牲者はいませんでした。";
      }
      buildNightHistoryLog(victims);
      state.pendingNightVictimId = null;
      state.pendingPsychoDeathIds = [];
      renderAlivePlayers();
      renderVictims();
    }

    function startNightPhase() {
      resetNightActions();
      state.dayAnnouncement = "";
      state.nightWolfMessageCommittedByPlayer = {};
      resetWolfConversationSelections();
      setGamePhase("night");
      renderNightStep();
      updateGameStatus("夜アクションをプレイヤーごとに順番で実行してください。");
    }

    function startMorningPhase(fromNight = true) {
      if (fromNight) {
        applyNightResult();
        state.round += 1;
      } else {
        applyNightResult();
      }
      state.voteWolfMessages = [];
      state.voteWolfMessageCommittedByPlayer = {};
      state.nightWolfMessageCommittedByPlayer = {};
      resetWolfConversationSelections();
      const bakerAlive = state.players.some((player) => player.alive && player.role === "baker");
      if (bakerAlive) {
        state.dayAnnouncement = state.dayAnnouncement
          ? `美味しいパンが焼かれました。\n${state.dayAnnouncement}`
          : "美味しいパンが焼かれました。";
      }
      dayAnnouncement.textContent = state.dayAnnouncement;
      
      // 勝利条件をチェック
      const hasWinner = checkWinnerAndEnd();
      
      setGamePhase("day");
      if (hasWinner) {
        if (toVotePhaseButton) {
          toVotePhaseButton.textContent = "結果を確認して次へ";
        }
        updateGameStatus("朝の結果を確認してから次へ進んでください。");
      } else {
        if (toVotePhaseButton) {
          toVotePhaseButton.textContent = "投票フェーズへ進む";
        }
        // ゲーム継続
        updateGameStatus("議論を行い、投票フェーズへ進んでください。");
      }
    }

    function startVotePhase(candidatePool = null) {
      state.currentVoterIndex = 0;
      state.votesByVoter = {};
      state.voteWolfMessages = [];
      state.voteWolfMessageCommittedByPlayer = {};
      state.selectedWolfConversationTargetName = "";
      state.selectedWolfConversationAction = "";
      state.selectedWolfConversationDecision = "";
      state.lastExecutedByVoteId = null;
      state.lastVoteAdditionalVictimId = null;
      state.selectedVoteCandidate = null;
      state.voteIdentityConfirmed = false;
      state.voteFinalized = false;
      state.tieCandidates = candidatePool;
      setGamePhase("vote");
      startNightAfterVoteButton.classList.add("hidden");
      renderVoteStep();
      const tieText = state.tieRound > 0 ? `再投票 ${state.tieRound} 回目` : "投票を開始します。";
      updateGameStatus(tieText);
    }

    function renderVoteTally(tallyMap) {
      voteTally.innerHTML = "";
      if (!state.showVoteTally) {
        const item = document.createElement("li");
        item.textContent = "投票数は非表示設定です。";
        voteTally.appendChild(item);
        return;
      }
      Array.from(tallyMap.entries())
        .sort((left, right) => right[1] - left[1])
        .forEach(([targetId, count]) => {
          const target = findPlayerById(Number(targetId));
          if (!target) return;
          const item = document.createElement("li");
          item.textContent = `${target.name}: ${count}票`;
          voteTally.appendChild(item);
        });
    }

    function getVoteCandidatesForVoter(voter) {
      const alive = getAlivePlayers();
      const poolIds = state.tieCandidates || alive.map((player) => player.id);
      const candidates = alive
        .filter((player) => poolIds.includes(player.id))
        .filter((player) => player.id !== voter.id);
      return candidates;
    }

    function executeByVote(targetId) {
      const target = findPlayerById(targetId);
      if (!target || !target.alive) return;
      target.alive = false;
      state.lastExecutedByVoteId = target.id;
      state.lastVoteAdditionalVictimId = null;

      let voteResultText = `${target.name} が処刑されました。`;
      if (target.role === "nekomata") {
        const companionId = resolveNekomataVoteCompanion(target.id, state.players);
        const companion = findPlayerById(companionId);
        if (companion && companion.alive) {
          companion.alive = false;
          state.lastVoteAdditionalVictimId = companion.id;
          voteResultText = `${target.name} が処刑されました。${companion.name} が道連れになりました。`;
        }
      }

      if (target.role === "blackcat") {
        const companionId = resolveBlackcatVoteCompanion(target.id, state.players);
        const companion = findPlayerById(companionId);
        if (companion && companion.alive) {
          companion.alive = false;
          state.lastVoteAdditionalVictimId = companion.id;
          voteResultText = `${target.name} が処刑されました。${companion.name} が道連れになりました。`;
        }
      }

      voteNote.textContent = voteResultText;
      renderAlivePlayers();
      renderVictims();
    }

    function finalizeVotes() {
      Object.entries(state.votesByVoter).forEach(([voterId, targetId]) => {
        const voter = findPlayerById(Number(voterId));
        const target = findPlayerById(Number(targetId));
        if (voter && target) {
          state.voteHistory.push({
            round: state.round,
            voterName: voter.name,
            targetName: target.name,
          });
        }
      });

      const tally = buildVoteTally(state.votesByVoter, state.players);
      renderVoteTally(tally);

      let maxVotes = 0;
      tally.forEach((count) => {
        maxVotes = Math.max(maxVotes, count);
      });
      const tied = Array.from(tally.entries())
        .filter((entry) => entry[1] === maxVotes)
        .map((entry) => Number(entry[0]));

      if (tied.length === 0) {
        voteNote.textContent = "有効票がありませんでした。";
      } else if (tied.length === 1) {
        executeByVote(tied[0]);
      } else if (state.tieRule === "random") {
        const chosen = tied[Math.floor(Math.random() * tied.length)];
        executeByVote(chosen);
        voteNote.textContent = `${voteNote.textContent}（同票のためランダム処理）`;
      } else if (state.tieRound >= 1) {
        const chosen = tied[Math.floor(Math.random() * tied.length)];
        executeByVote(chosen);
        voteNote.textContent = `${voteNote.textContent}（再投票でも同票のためランダム処刑）`;
      } else {
        state.tieRound += 1;
        voteNote.textContent = "同票のため再投票します。";
        startVotePhase(tied);
        return;
      }

      state.tieRound = 0;
      state.voteFinalized = true;
      const executed = findPlayerById(state.lastExecutedByVoteId);
      const additionalVictim = findPlayerById(state.lastVoteAdditionalVictimId);
      const voteResultSummary = executed
        ? additionalVictim
          ? `投票の結果、${executed.name}さんが犠牲者となりました。追加の犠牲者:${additionalVictim.name}さん`
          : `投票の結果、${executed.name}さんが犠牲者となりました。`
        : "投票の結果、犠牲者は出ませんでした。";
      voteVoterLabel.textContent = voteResultSummary;
      voteNote.textContent = voteResultSummary;
      state.voteResultByRound[state.round] = voteResultSummary;
      
      // 勝利条件をチェック
      if (checkWinnerAndEnd()) {
        // 勝利が決定した - 確認ボタンを表示して画面遷移を待つ
        startNightAfterVoteButton.textContent = "結果を確認して次へ";
        startNightAfterVoteButton.classList.remove("hidden");
        updateGameStatus("投票結果と犠牲者を確認後、結果を確認して次へ進んでください。");
      } else {
        // ゲーム継続 - 通常通り夜へ進むボタンを表示
        startNightAfterVoteButton.textContent = "夜のアクションを開始";
        startNightAfterVoteButton.classList.remove("hidden");
        updateGameStatus("投票結果を確認してから夜のアクションを開始してください。");
      }
    }

    function renderVoteStep() {
      const voters = getAlivePlayers();
      voteCandidateButtons.innerHTML = "";
      voteRoleHint.textContent = "";
      voteRoleHint.classList.add("hidden");
      if (voteWolfMessageLog) {
        voteWolfMessageLog.textContent = "";
        voteWolfMessageLog.classList.add("hidden");
      }

      if (state.currentVoterIndex >= voters.length) {
        voteVoterLabel.textContent = "集計中...";
        voteProgress.textContent = `${voters.length} / ${voters.length}`;
        voteNote.textContent = "集計中...";
        finalizeVotes();
        return;
      }

      const voter = voters[state.currentVoterIndex];
      const canUseWolfConversation = state.wolfConversation === "on" && isWolfConversationRole(voter.role);
      const candidates = getVoteCandidatesForVoter(voter);
      voteVoterLabel.textContent = `${voter.name} さんの投票`;
      voteProgress.textContent = `${state.currentVoterIndex + 1} / ${voters.length}`;

      if (!state.voteIdentityConfirmed) {
        voteVoterLabel.textContent = `${voter.name}さんですか？`;
        voteNote.textContent = "本人なら投票を開始してください。";
        const startButton = document.createElement("button");
        startButton.type = "button";
        startButton.textContent = "この人の投票開始";
        startButton.addEventListener("click", () => {
          state.voteIdentityConfirmed = true;
          renderVoteStep();
        });
        voteCandidateButtons.appendChild(startButton);
        return;
      }

      if (voter.role === "wolf" || voter.role === "ablewolf" || voter.role === "fanatic" || voter.role === "whisperingmadman" || voter.role === "twin") {
        if (voter.role === "wolf" || voter.role === "ablewolf" || voter.role === "fanatic" || voter.role === "whisperingmadman") {
          renderWolfTeamHint(voteRoleHint, voter.role, voter.id);
          if ((voter.role === "wolf" || voter.role === "ablewolf") && state.wolfTargetVisibility === "show") {
            const otherVoteText = getOtherWolvesTargetText(state.votesByVoter, voter.id);
            voteRoleHint.textContent = `${voteRoleHint.textContent}\n他の人狼の投票先: ${otherVoteText}`;
          }
        }
      }

      if (voter.role === "twin") {
        const mates = state.players
          .filter((player) => player.role === voter.role && player.id !== voter.id)
          .map((player) => player.name);
        const matesText = mates.length > 0 ? mates.join("、") : "なし";
        voteRoleHint.textContent = `双子\n仲間: ${matesText}`;
        voteRoleHint.classList.remove("hidden");
      }

      if (canUseWolfConversation && voteWolfMessageLog) {
        voteWolfMessageLog.textContent = `メッセージ\n${getWolfConversationMessagesText()}`;
        voteWolfMessageLog.classList.remove("hidden");
        renderWolfConversationComposer(voteCandidateButtons, voter.name, () => {
          renderVoteStep();
        });
      }

      if (candidates.length === 0) {
        state.currentVoterIndex += 1;
        state.voteIdentityConfirmed = false;
        resetWolfConversationSelections();
        renderVoteStep();
        return;
      }

      const selected = findPlayerById(state.selectedVoteCandidate);
      if (state.selectedVoteCandidate && !selected) {
        state.selectedVoteCandidate = null;
      }

      voteNote.textContent = selected
        ? `${selected.name} さんを選択中です。`
        : "投票対象を選んでください。";

      const voteActionBlock = document.createElement("div");
      voteActionBlock.className = "row wrap vote-action-block";
      voteCandidateButtons.appendChild(voteActionBlock);

      candidates.forEach((candidate) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = candidate.name;
        if (state.selectedVoteCandidate === candidate.id) {
          button.classList.add("selected");
        }
        button.addEventListener("click", () => {
          state.selectedVoteCandidate = candidate.id;
          renderVoteStep();
        });
        voteActionBlock.appendChild(button);
      });

      const confirmButton = document.createElement("button");
      confirmButton.type = "button";
      confirmButton.textContent = "投票する";
      confirmButton.disabled = !state.selectedVoteCandidate;
      confirmButton.addEventListener("click", () => {
        if (!state.selectedVoteCandidate) return;
        commitWolfConversationMessageForActor(voter, "vote");
        state.votesByVoter[voter.id] = state.selectedVoteCandidate;
        state.selectedVoteCandidate = null;
        resetWolfConversationSelections();
        state.voteIdentityConfirmed = false;
        state.currentVoterIndex += 1;
        renderVoteStep();
      });
      voteActionBlock.appendChild(confirmButton);

      if (state.selectedVoteCandidate) {
        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.textContent = "選び直す";
        cancelButton.className = "ghost";
        cancelButton.addEventListener("click", () => {
          state.selectedVoteCandidate = null;
          renderVoteStep();
        });
        voteActionBlock.appendChild(cancelButton);
      }
    }

    function renderNightZeroStep() {
      const current = state.players[state.nightZeroIndex];
      const next = state.players[state.nightZeroIndex + 1];
      if (!current) return;

      nightZeroQuestion.textContent = `${current.name}さんですか？`;
      if (nightZeroActionButtons) {
        nightZeroActionButtons.innerHTML = "";
      }
      const seerResultContainer = document.getElementById("night-zero-seer-result-container");
      if (seerResultContainer) {
        seerResultContainer.classList.add("hidden");
      }
      
      if (!state.nightZeroStarted) {
        nightZeroGuide.textContent = "本人なら、アクションを開始してください。";
        nightZeroStartButton.disabled = false;
        nightZeroDoneButton.disabled = true;
        return;
      }

      if (isDivinationRole(current.role)) {
        if (state.firstDaySeerMode === "none") {
          nightZeroGuide.textContent = "初日占いは「なし」設定です。";
          nightZeroStartButton.disabled = true;
          nightZeroDoneButton.disabled = false;
          return;
        }

        if (state.firstDaySeerMode === "random-white") {
          const result = getNightZeroSeerResult(current);
          setJudgementMessage(nightZeroSeerResult, result);
          if (seerResultContainer) {
            seerResultContainer.classList.remove("hidden");
          }
          nightZeroGuide.textContent = next
            ? `${current.name} さんのアクションが終わったら、${next.name} さんに渡してください。`
            : `${current.name} さんで最後です。完了すると本編に進みます。`;
          nightZeroStartButton.disabled = true;
          nightZeroDoneButton.disabled = false;
          return;
        }

        const manualResult = state.nightZeroSeerResultByPlayer[current.id];
        if (manualResult) {
          setJudgementMessage(nightZeroSeerResult, manualResult);
          if (seerResultContainer) {
            seerResultContainer.classList.remove("hidden");
          }
          nightZeroGuide.textContent = next
            ? `${current.name} さんのアクションが終わったら、${next.name} さんに渡してください。`
            : `${current.name} さんで最後です。完了すると本編に進みます。`;
          nightZeroStartButton.disabled = true;
          nightZeroDoneButton.disabled = false;
          return;
        }

        const candidates = state.players.filter((player) => player.id !== current.id);
        if (candidates.length === 0) {
          state.nightZeroSeerResultByPlayer[current.id] = "判定対象がいません。";
          setJudgementMessage(nightZeroSeerResult, state.nightZeroSeerResultByPlayer[current.id]);
          if (seerResultContainer) {
            seerResultContainer.classList.remove("hidden");
          }
          nightZeroStartButton.disabled = true;
          nightZeroDoneButton.disabled = false;
          return;
        }

        nightZeroGuide.textContent = "占い対象を選び、「占う」を押してください。";
        const selectedTargetId = state.nightZeroSelectionByPlayer[current.id];
        candidates.forEach((candidate) => {
          const button = document.createElement("button");
          button.type = "button";
          button.textContent = candidate.name;
          if (selectedTargetId === candidate.id) {
            button.classList.add("selected");
          }
          button.addEventListener("click", () => {
            state.nightZeroSelectionByPlayer[current.id] = candidate.id;
            renderNightZeroStep();
          });
          if (nightZeroActionButtons) {
            nightZeroActionButtons.appendChild(button);
          }
        });

        const executeButton = document.createElement("button");
        executeButton.type = "button";
        executeButton.textContent = "占う";
        executeButton.disabled = !selectedTargetId;
        executeButton.addEventListener("click", () => {
          const selectedTarget = findPlayerById(state.nightZeroSelectionByPlayer[current.id]);
          if (!selectedTarget) return;
          if (selectedTarget.role === "psycho") {
            addPendingPsychoDeath(current.id);
          }
          state.nightZeroSeerResultByPlayer[current.id] = getDivinationResultText(current.role, selectedTarget);
          renderNightZeroStep();
        });
        if (nightZeroActionButtons) {
          nightZeroActionButtons.appendChild(executeButton);
        }

        if (selectedTargetId) {
          const resetButton = document.createElement("button");
          resetButton.type = "button";
          resetButton.className = "ghost";
          resetButton.textContent = "選び直す";
          resetButton.addEventListener("click", () => {
            delete state.nightZeroSelectionByPlayer[current.id];
            renderNightZeroStep();
          });
          if (nightZeroActionButtons) {
            nightZeroActionButtons.appendChild(resetButton);
          }
        }

        nightZeroStartButton.disabled = true;
        nightZeroDoneButton.disabled = true;
        return;
      }

      nightZeroGuide.textContent = next
        ? `${current.name} さんのアクションが終わったら、${next.name} さんに渡してください。`
        : `${current.name} さんで最後です。完了すると本編に進みます。`;
      nightZeroStartButton.disabled = true;
      nightZeroDoneButton.disabled = false;
    }

    function getNightZeroSeerResult(seerPlayer) {
      if (state.nightZeroSeerResultByPlayer[seerPlayer.id]) {
        return state.nightZeroSeerResultByPlayer[seerPlayer.id];
      }

      const candidates = state.players.filter(
        (player) => player.role !== "wolf" && player.role !== "ablewolf" && player.role !== "psycho" && player.id !== seerPlayer.id,
      );
      if (candidates.length === 0) {
        const fallback = "判定対象がいません。";
        state.nightZeroSeerResultByPlayer[seerPlayer.id] = fallback;
        return fallback;
      }

      const target = candidates[Math.floor(Math.random() * candidates.length)];
      const result = getDivinationResultText(seerPlayer.role, target);
      state.nightZeroSeerResultByPlayer[seerPlayer.id] = result;
      return result;
    }

    function renderRevealStep() {
      const current = state.players[state.revealIndex];
      revealProgress.textContent = `${state.revealIndex + 1} / ${state.players.length}人目`;
      if (revealActionButtons) {
        revealActionButtons.innerHTML = "";
      }
      if (state.hasShownCurrent) {
        let canProceed = true;
        showRoleButton.classList.add("hidden");
        nextPlayerButton.classList.remove("hidden");
        roleName.textContent = ROLE_LABELS[current.role];
        roleName.classList.remove("hidden");
        if (roleDescription) {
          roleDescription.textContent = ROLE_DESCRIPTIONS[current.role] || "";
          roleDescription.classList.remove("hidden");
        }
        if (current.role === "wolf" || current.role === "ablewolf" || current.role === "fanatic" || current.role === "whisperingmadman" || current.role === "twin") {
          if (current.role === "wolf" || current.role === "ablewolf" || current.role === "fanatic" || current.role === "whisperingmadman") {
            revealMessage.textContent = `${current.name} さんの役職です。確認して次へ進んでください。`;
            const revealWolfMates = document.getElementById("reveal-wolf-mates");
            renderWolfTeamHint(revealWolfMates, current.role, current.id);
            nextPlayerButton.disabled = false;
            showRoleButton.disabled = true;
            return;
          }

          const mates = state.players
            .filter((player) => player.role === current.role && player.id !== current.id)
            .map((player) => player.name);
          const matesText = mates.length > 0 ? mates.join("、") : "なし";
          const label = "相方の双子";
          revealMessage.textContent = `${current.name} さんの役職です。確認して次へ進んでください。`;
          const revealWolfMates = document.getElementById("reveal-wolf-mates");
          if (revealWolfMates) {
            revealWolfMates.textContent = `${label}: ${matesText}`;
            revealWolfMates.classList.remove("hidden");
          }
        } else {
          revealMessage.textContent = `${current.name} さんの役職です。確認して次へ進んでください。`;
          const revealWolfMates = document.getElementById("reveal-wolf-mates");
          if (revealWolfMates) {
            revealWolfMates.textContent = "";
            revealWolfMates.classList.add("hidden");
          }
        }

        if (isDivinationRole(current.role)) {
          const revealWolfMates = document.getElementById("reveal-wolf-mates");
          if (state.firstDaySeerMode === "none") {
            if (revealWolfMates) {
              revealWolfMates.textContent = "初日占いは「なし」設定です。";
              revealWolfMates.classList.remove("hidden");
            }
          } else if (state.firstDaySeerMode === "random-white") {
            const result = getNightZeroSeerResult(current);
            if (revealWolfMates) {
              setJudgementMessage(revealWolfMates, result);
              revealWolfMates.classList.remove("hidden");
            }
          } else {
            const manualResult = state.nightZeroSeerResultByPlayer[current.id];
            if (manualResult) {
              if (revealWolfMates) {
                setJudgementMessage(revealWolfMates, manualResult);
                revealWolfMates.classList.remove("hidden");
              }
            } else {
              canProceed = false;
              revealMessage.textContent = `${current.name} さんの役職です。初日占いの対象を選んでください。`;
              const selectedTargetId = state.nightZeroSelectionByPlayer[current.id];
              const candidates = state.players.filter((player) => player.id !== current.id);
              candidates.forEach((candidate) => {
                const button = document.createElement("button");
                button.type = "button";
                button.textContent = candidate.name;
                if (selectedTargetId === candidate.id) {
                  button.classList.add("selected");
                }
                button.addEventListener("click", () => {
                  state.nightZeroSelectionByPlayer[current.id] = candidate.id;
                  renderRevealStep();
                });
                if (revealActionButtons) {
                  revealActionButtons.appendChild(button);
                }
              });

              const executeButton = document.createElement("button");
              executeButton.type = "button";
              executeButton.textContent = "占う";
              executeButton.disabled = !selectedTargetId;
              executeButton.addEventListener("click", () => {
                const selectedTarget = findPlayerById(state.nightZeroSelectionByPlayer[current.id]);
                if (!selectedTarget) return;
                if (selectedTarget.role === "psycho") {
                  addPendingPsychoDeath(current.id);
                }
                state.nightZeroSeerResultByPlayer[current.id] = getDivinationResultText(current.role, selectedTarget);
                renderRevealStep();
              });
              if (revealActionButtons) {
                revealActionButtons.appendChild(executeButton);
              }

              if (selectedTargetId) {
                const resetButton = document.createElement("button");
                resetButton.type = "button";
                resetButton.className = "ghost";
                resetButton.textContent = "選び直す";
                resetButton.addEventListener("click", () => {
                  delete state.nightZeroSelectionByPlayer[current.id];
                  renderRevealStep();
                });
                if (revealActionButtons) {
                  revealActionButtons.appendChild(resetButton);
                }
              }

              if (revealWolfMates) {
                revealWolfMates.textContent = "";
                revealWolfMates.classList.add("hidden");
              }
            }
          }
        }

        nextPlayerButton.disabled = !canProceed;
        showRoleButton.disabled = true;
        return;
      }

      roleName.classList.add("hidden");
      if (roleDescription) {
        roleDescription.textContent = "";
        roleDescription.classList.add("hidden");
      }
      const revealWolfMates = document.getElementById("reveal-wolf-mates");
      if (revealWolfMates) {
        revealWolfMates.textContent = "";
        revealWolfMates.classList.add("hidden");
      }
      revealMessage.textContent = `${current.name} さんの番です。周りに見られないよう「役職を見る」を押してください。`;
      showRoleButton.classList.remove("hidden");
      nextPlayerButton.classList.remove("hidden");
      nextPlayerButton.disabled = true;
      showRoleButton.disabled = false;
    }

    function resetAll(options = {}) {
      const keepNames = Boolean(options.keepNames);
      const keepSettings = Boolean(options.keepSettings);
      const previousNames = keepNames ? [...state.names] : [];
      const previousTieRule = keepSettings ? state.tieRule : "random";
      const previousShowVoteTally = keepSettings ? state.showVoteTally : false;
      const previousFirstDaySeerMode = keepSettings ? state.firstDaySeerMode : "random-white";
      const previousTestMode = keepSettings ? state.testMode : false;
      const previousKnightConsecutiveGuard = keepSettings ? state.knightConsecutiveGuard : "allowed";
      const previousWolfConversation = keepSettings ? state.wolfConversation : "off";
      const previousWolfTargetVisibility = keepSettings ? state.wolfTargetVisibility : "hide";
      
      stopPhaseTimer();
      state.names = keepNames ? previousNames : [];
      state.players = [];
      state.revealIndex = 0;
      state.hasShownCurrent = false;
      state.gamePhase = "night";
      state.round = 1;
      state.nightZeroIndex = 0;
      state.nightZeroStarted = false;
      state.nightZeroSeerResultByPlayer = {};
      state.nightZeroSelectionByPlayer = {};
      state.pendingPsychoDeathIds = [];
      state.pendingNightVictimId = null;
      state.nightActionSelection = null;
      state.currentNightActorIndex = 0;
      state.nightActionStarted = false;
      state.nightActions = {
        wolfVotesByVoter: {},
        seerChecksByVoter: {},
        mediumChecksByVoter: {},
        knightProtectByVoter: {},
      };
      state.nightActionDoneByActor = {};
      state.nightActionResultByActor = {};
      state.selectedVoteCandidate = null;
      state.voteIdentityConfirmed = false;
      state.dayAnnouncement = "";
      state.votesByVoter = {};
      state.voteHistory = [];
      state.voteResultByRound = {};
      state.nightHistory = [];
      state.lastExecutedByVoteId = null;
      state.lastVoteAdditionalVictimId = null;
      state.currentVoterIndex = 0;
      state.tieCandidates = null;
      state.tieRound = 0;
      state.tieRule = previousTieRule;
      state.showVoteTally = previousShowVoteTally;
      state.firstDaySeerMode = previousFirstDaySeerMode;
      state.testMode = previousTestMode;
      state.voteFinalized = false;
      state.gameWinner = null;
      state.knightConsecutiveGuard = previousKnightConsecutiveGuard;
      state.wolfConversation = previousWolfConversation;
      state.wolfTargetVisibility = previousWolfTargetVisibility;
      state.voteWolfMessages = [];
      state.voteWolfMessageCommittedByPlayer = {};
      state.nightWolfMessageCommittedByPlayer = {};
      state.selectedWolfConversationTargetName = "";
      state.selectedWolfConversationAction = "";
      state.selectedWolfConversationDecision = "";
      state.phaseTimerSeconds = 120;
      state.phaseTimerLeft = 120;
      playersError.textContent = "";
      voteNote.textContent = "";
      voteTally.innerHTML = "";
      winnerText.textContent = "";
      if (endTitle) {
        endTitle.textContent = "ゲーム終了";
        endTitle.classList.remove("winner-citizen", "winner-wolf", "winner-draw");
      }
      winnerText.classList.add("hidden");
      playerNameInput.value = "";
      state.roleCounts = createDefaultRoleCounts();
      setupTieRuleSelect.value = previousTieRule;
      setupShowVoteTallySelect.value = previousShowVoteTally ? "show" : "hide";
      if (setupFirstDaySeerSelect) {
        setupFirstDaySeerSelect.value = previousFirstDaySeerMode;
      }
      roleSetupSummary.textContent = "プレイヤー数: 0人";
      nightZeroSeerResult.textContent = "";
      const seerResultContainer = document.getElementById("night-zero-seer-result-container");
      if (seerResultContainer) {
        seerResultContainer.classList.add("hidden");
      }
      nightActionButtons.innerHTML = "";
      nightActionResult.innerHTML = "";
      nightGuide.textContent = "";
      nightQuestion.textContent = "";
      if (voteWolfMessageLog) {
        voteWolfMessageLog.textContent = "";
        voteWolfMessageLog.classList.add("hidden");
      }
      confirmNightActionButton.classList.add("hidden");
      startNightAfterVoteButton.classList.add("hidden");
      if (setupKnightConsecutiveGuardSelect) {
        setupKnightConsecutiveGuardSelect.value = previousKnightConsecutiveGuard;
      }
      if (setupWolfConversationSelect) {
        setupWolfConversationSelect.value = previousWolfConversation;
      }
      if (setupWolfTargetVisibilitySelect) {
        setupWolfTargetVisibilitySelect.value = previousWolfTargetVisibility;
      }
      if (setupTestModeCheckbox) {
        setupTestModeCheckbox.checked = previousTestMode;
      }
      if (timerHeading) {
        timerHeading.classList.remove("hidden");
      }
      if (timerRow) {
        timerRow.classList.remove("hidden");
      }
      updatePhaseTimerUI();
      renderPlayersPreview();
      renderRoleCounters();
      setScreen("players");
    }

    function addPlayer() {
      playersError.textContent = "";
      const inputName = normalizePlayerName(playerNameInput.value);
      if (!inputName) {
        playersError.textContent = "名前を入力してください。";
        return;
      }
      if (state.names.length >= 30) {
        playersError.textContent = "プレイヤーは30人までです。";
        return;
      }

      if (state.names.includes(inputName)) {
        playersError.textContent = "同じ名前は登録できません。";
        return;
      }

      state.names.push(inputName);
      playerNameInput.value = "";
      playerNameInput.focus();
      renderPlayersPreview();
    }

    function addTestModeSamplePlayers() {
      let didAdd = false;
      for (const sampleName of TEST_MODE_SAMPLE_NAMES) {
        if (state.names.length >= 30) break;
        if (state.names.includes(sampleName)) continue;
        state.names.push(sampleName);
        didAdd = true;
      }
      if (!didAdd) return;
      playersError.textContent = "";
      renderPlayersPreview();
      renderRoleCounters();
    }

    playerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      addPlayer();
    });

    document.getElementById("clear-players").addEventListener("click", () => {
      state.names = [];
      playersError.textContent = "";
      renderPlayersPreview();
      renderRoleCounters();
    });

    document.getElementById("decide-roles").addEventListener("click", () => {
      playersError.textContent = "";
      try {
        const validated = validateRoleCounts(state.names.length, state.roleCounts);

        state.roleCounts = {
          ...state.roleCounts,
          ...validated.counts,
        };
        const deck = createRoleDeck(state.roleCounts);
        state.players = buildPlayers([...state.names], shuffle(deck));
        state.revealIndex = 0;
        state.hasShownCurrent = false;
        renderRevealStep();
        setScreen("reveal");
      } catch (error) {
        playersError.textContent = error.message;
      }
    });

    showRoleButton.addEventListener("click", () => {
      state.hasShownCurrent = true;
      renderRevealStep();
    });

    nextPlayerButton.addEventListener("click", () => {
      state.revealIndex += 1;
      state.hasShownCurrent = false;

      if (state.revealIndex >= state.players.length) {
        renderFinalSummary();
        state.round = 1;
        state.nightZeroIndex = 0;
        state.nightZeroStarted = false;
        state.nightActionSelection = null;
        state.currentNightActorIndex = 0;
        state.nightActionStarted = false;
        state.pendingNightVictimId = null;
        state.dayAnnouncement = "1日目のアクションが完了しました。";
        state.tieRound = 0;
        voteNote.textContent = "";
        voteTally.innerHTML = "";
        winnerText.textContent = "";
        setScreen("game");
        startMorningPhase(false);
        return;
      }

      renderRevealStep();
    });

    document.getElementById("restart").addEventListener("click", () => {
      const shouldRestart = window.confirm("本当に初めからやり直しますか？");
      if (!shouldRestart) return;
      resetAll({ keepNames: true, keepSettings: true });
    });

    nightZeroStartButton.addEventListener("click", () => {
      state.nightZeroStarted = true;
      renderNightZeroStep();
    });

    nightZeroDoneButton.addEventListener("click", () => {
      state.nightZeroIndex += 1;
      state.nightZeroStarted = false;
      if (nightZeroActionButtons) {
        nightZeroActionButtons.innerHTML = "";
      }
      if (state.nightZeroIndex >= state.players.length) {
        state.round = 1;
        state.pendingNightVictimId = null;
        state.dayAnnouncement = "1日目夜が終了しました。";
        startMorningPhase(false);
        return;
      }
      renderNightZeroStep();
    });

    confirmNightActionButton.addEventListener("click", () => {
      resolveNightActions();
      startMorningPhase(true);
    });

    nightActionStartButton.addEventListener("click", () => {
      state.nightActionStarted = true;
      state.nightActionSelection = null;
      renderNightStep();
    });

    nightActionDoneButton.addEventListener("click", () => {
      const actors = getAlivePlayers();
      const currentActor = actors[state.currentNightActorIndex] || null;
      commitWolfConversationMessageForActor(currentActor, "night");
      state.currentNightActorIndex += 1;
      state.nightActionStarted = false;
      state.nightActionSelection = null;
      renderNightStep();
    });

    toVotePhaseButton.addEventListener("click", () => {
      // 勝利が既に確定しているか確認
      if (state.gameWinner) {
        displayGameEnd();
        return;
      }
      
      state.tieRound = 0;
      voteNote.textContent = "";
      voteTally.innerHTML = "";
      startVotePhase();
    });

    startNightAfterVoteButton.addEventListener("click", () => {
      if (!state.voteFinalized) return;
      
      if (state.gameWinner) {
        // 勝利が決定している場合 - 最終画面を表示
        displayGameEnd();
      } else {
        // ゲーム継続 - 夜フェーズへ進む
        startNightAfterVoteButton.classList.add("hidden");
        startNightPhase();
      }
    });

    document.getElementById("start-phase-timer").addEventListener("click", () => {
      startPhaseTimer();
    });

    document.getElementById("pause-phase-timer").addEventListener("click", () => {
      stopPhaseTimer();
    });

    if (decreasePhaseSecondsButton) {
      decreasePhaseSecondsButton.addEventListener("click", () => {
        adjustPhaseTimerSeconds(-10);
      });
    }

    if (increasePhaseSecondsButton) {
      increasePhaseSecondsButton.addEventListener("click", () => {
        adjustPhaseTimerSeconds(10);
      });
    }

    setupTieRuleSelect.addEventListener("change", () => {
      state.tieRule = setupTieRuleSelect.value === "random" ? "random" : "revote";
    });

    setupShowVoteTallySelect.addEventListener("change", () => {
      state.showVoteTally = setupShowVoteTallySelect.value !== "hide";
    });

    if (setupFirstDaySeerSelect) {
      setupFirstDaySeerSelect.addEventListener("change", () => {
        const selected = setupFirstDaySeerSelect.value;
        state.firstDaySeerMode = selected === "enabled" || selected === "none" ? selected : "random-white";
      });
    }

    if (setupKnightConsecutiveGuardSelect) {
      setupKnightConsecutiveGuardSelect.addEventListener("change", () => {
        state.knightConsecutiveGuard = setupKnightConsecutiveGuardSelect.value === "blocked" ? "blocked" : "allowed";
      });
    }

    if (setupWolfConversationSelect) {
      setupWolfConversationSelect.addEventListener("change", () => {
        state.wolfConversation = setupWolfConversationSelect.value === "on" ? "on" : "off";
      });
    }

    if (setupWolfTargetVisibilitySelect) {
      setupWolfTargetVisibilitySelect.addEventListener("change", () => {
        state.wolfTargetVisibility = setupWolfTargetVisibilitySelect.value === "show" ? "show" : "hide";
      });
    }

    if (setupTestModeCheckbox) {
      setupTestModeCheckbox.addEventListener("change", () => {
        state.testMode = setupTestModeCheckbox.checked;
        if (state.testMode) {
          addTestModeSamplePlayers();
        }
        renderAlivePlayers();
        renderVictims();
      });
    }

    function handleRoleAdjustInput(event) {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const button = target.closest("button[data-role-action][data-role]");
      if (!(button instanceof HTMLElement)) return;
      const role = button.dataset.role;
      const action = button.dataset.roleAction;
      if (!role || !ROLE_DEFINITIONS[role]?.adjustable) return;

      if (event.type === "pointerdown") {
        event.preventDefault();
      }

      if (event.type === "click") {
        const mouseEvent = event;
        if (mouseEvent instanceof MouseEvent && mouseEvent.detail > 0) {
          return;
        }
      }

      adjustRoleCount(role, action === "minus" ? -1 : 1);
    }

    playersCard.addEventListener("pointerdown", handleRoleAdjustInput);
    playersCard.addEventListener("click", handleRoleAdjustInput);

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js").catch(() => {
        });
      });
    }

    renderRoleSetupControls();
    renderRoleCounters();
    resetAll();
  }

  global.JinroApp = app;
})(typeof globalThis !== "undefined" ? globalThis : window);