import { atom } from 'jotai';

export const activeRootDutyIdAtom = atom<number | null>(null);

export const activeParentDutyIdAtom = atom<number | null>(null);

export const selectedDutyIdsAtom = atom<number[]>([]);

export const selectedDutyIdsSetAtom = atom<Set<number>>((get) => new Set(get(selectedDutyIdsAtom)));
