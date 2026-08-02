import { Customer } from "@/lib/types";

export const CUSTOMERS: readonly Customer[] = [
  {
    id: "c1",
    name: "Bhavinbhai",
    nameAliases: ["bhavinbhai", "bhavin bhai", "ભાવિનભાઈ", "ભાવિન ભાઈ"],
    product: "Buffalo Milk",
    quantityLiters: 2,
    frequency: "daily",
    ratePerLiter: 75,
    billing: "monthly",
    status: "active"
  },
  {
    id: "c2",
    name: "Ramaben",
    nameAliases: ["ramaben", "rama ben", "રમાબેન"],
    product: "Cow Milk",
    quantityLiters: 1,
    frequency: "daily",
    ratePerLiter: 60,
    billing: "monthly",
    status: "active"
  },
  {
    id: "c3",
    name: "Patel Saheb",
    nameAliases: ["patel saheb", "patel", "પટેલ સાહેબ", "પટેલ"],
    product: "Cow Milk",
    quantityLiters: 1,
    frequency: "daily",
    ratePerLiter: 60,
    billing: "monthly",
    status: "active"
  }
];
