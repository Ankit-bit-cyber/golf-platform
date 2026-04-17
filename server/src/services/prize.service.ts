export function calcPools(subscriberCount: number, perSubPoolShare: number, rollover = 0) {
  const total = subscriberCount * perSubPoolShare + rollover;
  return {
    jackpot: total * 0.40,
    tier2:   total * 0.35,
    tier3:   total * 0.25,
  };
}
