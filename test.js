const assert = require("node:assert/strict");
const app = require("./app.js");

function run() {
  assert.equal(app.normalizePlayerName("  たろう  "), "たろう");
  assert.equal(app.normalizePlayerName(""), "");

  const valid = app.validateRoleCounts(6, {
    wolf: 1,
    citizen: 2,
    baker: 1,
    seer: 1,
    medium: 1,
    fanatic: 1,
    psycho: 1,
  });
  assert.equal(valid.total, 6);
  assert.equal(valid.wolves, 1);
  assert.equal(valid.citizens, 0);
  assert.equal(valid.bakers, 1);
  assert.equal(valid.seers, 1);
  assert.equal(valid.mediums, 1);
  assert.equal(valid.fanatics, 1);

  const validWithWhisperingMadman = app.validateRoleCounts(7, {
    wolf: 1,
    baker: 1,
    seer: 1,
    medium: 1,
    whisperingmadman: 1,
  });
  assert.equal(validWithWhisperingMadman.total, 7);
  assert.equal(validWithWhisperingMadman.wolves, 1);
  assert.equal(validWithWhisperingMadman.citizens, 2);

  const validWithAbleWolfOnly = app.validateRoleCounts(6, {
    wolf: 0,
    ablewolf: 1,
    seer: 1,
    medium: 1,
  });
  assert.equal(validWithAbleWolfOnly.total, 6);
  assert.equal(validWithAbleWolfOnly.wolves, 1);
  assert.equal(validWithAbleWolfOnly.citizens, 3);

  assert.throws(() => app.validateRoleCounts(2, { wolf: 1, citizen: 1, seer: 0, medium: 0 }));
  assert.throws(() => app.validateRoleCounts(6, { wolf: 0, citizen: 6, seer: 0, medium: 0 }));
  assert.throws(() => app.validateRoleCounts(6, { wolf: 3, citizen: 0, seer: 3, medium: 0 }));
  assert.throws(() => app.validateRoleCounts(6, { wolf: 2, citizen: 0, seer: 3, medium: 2 }));
  assert.throws(() => app.validateRoleCounts(6, { wolf: 1, citizen: 0, seer: 1, medium: 0, twin: 1 }));

  const validWithTwins = app.validateRoleCounts(8, {
    wolf: 1,
    seer: 1,
    medium: 1,
    twin: 2,
  });
  assert.equal(validWithTwins.twins, 2);
  assert.equal(validWithTwins.citizens, 3);

  const deck = app.createRoleDeck({
    wolf: 2,
    ablewolf: 1,
    citizen: 2,
    baker: 1,
    seer: 1,
    medium: 1,
    fanatic: 1,
    psycho: 1,
    whisperingmadman: 1,
    twin: 2,
  });
  assert.equal(deck.length, 13);
  assert.equal(deck.filter((role) => role === "wolf").length, 2);
  assert.equal(deck.filter((role) => role === "ablewolf").length, 1);
  assert.equal(deck.filter((role) => role === "citizen").length, 2);
  assert.equal(deck.filter((role) => role === "baker").length, 1);
  assert.equal(deck.filter((role) => role === "seer").length, 1);
  assert.equal(deck.filter((role) => role === "medium").length, 1);
  assert.equal(deck.filter((role) => role === "fanatic").length, 1);
  assert.equal(deck.filter((role) => role === "psycho").length, 1);
  assert.equal(deck.filter((role) => role === "whisperingmadman").length, 1);
  assert.equal(deck.filter((role) => role === "twin").length, 2);

  const shuffled = app.shuffle([1, 2, 3, 4], () => 0.5);
  assert.equal(shuffled.length, 4);
  assert.deepEqual([...shuffled].sort((a, b) => a - b), [1, 2, 3, 4]);

  const players = app.buildPlayers(["A", "B", "C"], ["wolf", "citizen", "citizen"]);
  assert.equal(players[0].name, "A");
  assert.equal(players[2].role, "citizen");
  assert.equal(players[1].alive, true);

  const ongoing = [
    { role: "wolf", alive: true },
    { role: "citizen", alive: true },
    { role: "citizen", alive: true },
  ];
  const wolfWin = [
    { role: "wolf", alive: true },
    { role: "citizen", alive: true },
  ];
  const ableWolfWin = [
    { role: "ablewolf", alive: true },
    { role: "citizen", alive: true },
  ];
  const citizenWin = [
    { role: "wolf", alive: false },
    { role: "citizen", alive: true },
  ];
  const draw = [
    { role: "wolf", alive: false },
    { role: "citizen", alive: false },
    { role: "citizen", alive: false },
  ];

  assert.equal(app.evaluateWinner(ongoing), null);
  assert.equal(app.evaluateWinner(wolfWin), "wolf");
  assert.equal(app.evaluateWinner(ableWolfWin), "wolf");
  assert.equal(app.evaluateWinner(citizenWin), "citizen");
  assert.equal(app.evaluateWinner(draw), "draw");
  assert.equal(app.formatTime(65), "01:05");

  console.log("All tests passed.");
}

run();