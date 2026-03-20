"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { challenges } from "@/data/mock";
import type { ChallengeStep } from "@/data/mock";

function DifficultyBadge({ difficulty }: { difficulty: "초급" | "중급" | "고급" }) {
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

function StepIcon({ status }: { status: ChallengeStep["status"] }) {
  if (status === "completed") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500">
        <svg className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  }
  if (status === "in_progress") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500">
        <span className="h-2.5 w-2.5 rounded-full bg-white" />
      </span>
    );
  }
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700" />
  );
}

function CicdBadge({ status }: { status: "pass" | "fail" | "pending" | null }) {
  if (!status) return null;
  const map = {
    pass: "bg-green-100 text-green-800",
    fail: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
  };
  const label = { pass: "PASS", fail: "FAIL", pending: "PENDING" };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[status]}`}>
      CI/CD {label[status]}
    </span>
  );
}

export default function ChallengePage() {
  const params = useParams<{ id: string }>();
  const challenge = challenges.find((c) => c.id === params.id);

  if (!challenge) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="text-center">
          <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
            챌린지를 찾을 수 없습니다.
          </p>
          <Link
            href="/challenges"
            className="mt-4 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            챌린지 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const hasStarted = challenge.steps.some((s) => s.status !== "pending");
  // Mock evaluation data tied to challenge id "1" for demo purposes
  const mockEval =
    challenge.id === "1"
      ? {
          cicdStatus: "pass" as const,
          claudeReview:
            "훅 구현이 깔끔합니다. 스킬 문서에 예시를 더 추가하면 좋겠습니다.",
        }
      : null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/challenges"
          className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          챌린지 목록
        </Link>

        {/* Header */}
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
          <div className="flex flex-wrap items-start gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {challenge.title}
            </h1>
            <DifficultyBadge difficulty={challenge.difficulty} />
          </div>

          {/* Tech stack */}
          <div className="mt-3 flex flex-wrap gap-2">
            {challenge.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {challenge.description}
          </p>

          {/* Real-world app info */}
          <div className="mt-5 rounded-lg bg-zinc-50 p-4 ring-1 ring-zinc-100 dark:bg-zinc-800 dark:ring-zinc-700">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              리얼월드 앱
            </h2>
            <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {challenge.realWorldApp}
            </p>
            <a
              href={challenge.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-xs text-blue-600 hover:underline dark:text-blue-400"
            >
              {challenge.repoUrl}
            </a>
          </div>
        </div>

        {/* 5-step progress stepper */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
          <h2 className="mb-6 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            진행 현황
          </h2>
          <ol className="space-y-0">
            {challenge.steps.map((step, index) => {
              const isLast = index === challenge.steps.length - 1;
              return (
                <li key={step.id} className="flex gap-4">
                  {/* Left column: icon + connector */}
                  <div className="flex flex-col items-center">
                    <StepIcon status={step.status} />
                    {!isLast && (
                      <span
                        className={`mt-1 mb-1 w-0.5 flex-1 ${
                          step.status === "completed"
                            ? "bg-green-300"
                            : "bg-zinc-200 dark:bg-zinc-700"
                        }`}
                        style={{ minHeight: "2rem" }}
                      />
                    )}
                  </div>

                  {/* Right column: text */}
                  <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
                    <p
                      className={`text-sm font-semibold ${
                        step.status === "completed"
                          ? "text-green-700 dark:text-green-400"
                          : step.status === "in_progress"
                          ? "text-blue-700 dark:text-blue-400"
                          : "text-zinc-400 dark:text-zinc-500"
                      }`}
                    >
                      {step.id}. {step.name}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Teaching mode skill install */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
          <h2 className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            티칭모드 스킬 설치
          </h2>
          <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">
            아래 명령어를 터미널에서 실행하여 CDL 티칭모드 스킬을 설치하세요.
          </p>
          <pre className="rounded-lg bg-zinc-900 px-4 py-3 text-sm text-green-400 dark:bg-zinc-950 overflow-x-auto">
            <code>claude skill install cdl-teaching-mode</code>
          </pre>
        </div>

        {/* Evaluation results */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
          <h2 className="mb-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            평가 결과
          </h2>

          {mockEval ? (
            <div className="space-y-4">
              {/* CI/CD status */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">CI/CD 상태:</span>
                <CicdBadge status={mockEval.cicdStatus} />
              </div>

              {/* Claude Code review */}
              <div>
                <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Claude Code 리뷰
                </p>
                <div className="rounded-lg bg-zinc-50 p-4 text-sm text-zinc-700 ring-1 ring-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700">
                  {mockEval.claudeReview}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <CicdBadge status="pending" />
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                아직 평가 결과가 없습니다. 챌린지를 완료하면 결과가 표시됩니다.
              </p>
            </div>
          )}
        </div>

        {/* Start button (only shown if challenge not started) */}
        {!hasStarted && (
          <div className="mt-8 flex justify-center">
            <button className="rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600">
              챌린지 시작하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
