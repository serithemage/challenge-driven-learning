"use client";

import { useState } from "react";
import Link from "next/link";
import { challenges, techStackFilters } from "@/data/mock";
import type { Challenge } from "@/data/mock";

function DifficultyBadge({ difficulty }: { difficulty: Challenge["difficulty"] }) {
  const colorMap = {
    초급: "bg-green-100 text-green-800",
    중급: "bg-yellow-100 text-yellow-800",
    고급: "bg-red-100 text-red-800",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorMap[difficulty]}`}>
      {difficulty}
    </span>
  );
}

export default function ChallengesPage() {
  const [activeFilter, setActiveFilter] = useState("전체");

  const filtered =
    activeFilter === "전체"
      ? challenges
      : challenges.filter((c) => c.techStack.includes(activeFilter));

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            챌린지 탐색
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            리얼월드 앱을 통해 Claude Code 스킬을 익혀보세요.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="mb-8 flex flex-wrap gap-2">
          {techStackFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                  : "bg-white text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Challenge grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((challenge) => (
            <Link
              key={challenge.id}
              href={`/challenges/${challenge.id}`}
              className="group flex flex-col rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 transition-shadow hover:shadow-md dark:bg-zinc-900 dark:ring-zinc-800"
            >
              {/* Title */}
              <h2 className="text-base font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400">
                {challenge.title}
              </h2>

              {/* Description – clamp to 2 lines */}
              <p className="mt-2 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
                {challenge.description}
              </p>

              {/* Tech stack badges */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {challenge.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Footer: difficulty + enrolled count */}
              <div className="mt-auto pt-4 flex items-center justify-between">
                <DifficultyBadge difficulty={challenge.difficulty} />
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  수강생 {challenge.enrolledCount}명
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center text-sm text-zinc-400">
            해당 기술스택의 챌린지가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
