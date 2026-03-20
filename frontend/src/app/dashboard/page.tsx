'use client'

import { useState } from 'react'
import Link from 'next/link'
import { students, evaluationResults } from '@/data/mock'

const currentStudent = students[0]

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-2 shadow-sm">
      <span className="text-sm text-slate-500 font-medium">{label}</span>
      <span className={`text-3xl font-bold ${color}`}>{value}</span>
    </div>
  )
}

function CicdBadge({ result }: { result: 'pass' | 'fail' | 'pending' | null }) {
  if (!result) return <span className="text-xs text-slate-400">-</span>
  const styles = {
    pass: 'bg-green-100 text-green-700',
    fail: 'bg-red-100 text-red-700',
    pending: 'bg-yellow-100 text-yellow-700',
  }
  const labels = { pass: 'CI/CD 통과', fail: 'CI/CD 실패', pending: '대기 중' }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[result]}`}>
      {labels[result]}
    </span>
  )
}

function StepStatusDot({ status }: { status: 'completed' | 'in_progress' | 'pending' }) {
  const styles = {
    completed: 'bg-green-500',
    in_progress: 'bg-blue-500',
    pending: 'bg-slate-300',
  }
  const labels = { completed: '완료', in_progress: '진행 중', pending: '대기' }
  return (
    <span className="flex items-center gap-1.5 text-xs text-slate-600">
      <span className={`w-2 h-2 rounded-full ${styles[status]}`} />
      {labels[status]}
    </span>
  )
}

export default function DashboardPage() {
  const inProgress = currentStudent.challengeProgress.filter((p) => p.status === 'in_progress')
  const completed = currentStudent.challengeProgress.filter((p) => p.status === 'completed')

  const scores = completed.map((p) => p.score).filter((s): s is number => s !== null)
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0

  const myEvaluations = evaluationResults.filter((e) => e.studentName === currentStudent.name)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">내 대시보드</h1>
        <p className="text-slate-500 mt-1">{currentStudent.name}님, 환영합니다.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard label="진행 중 챌린지" value={inProgress.length} color="text-blue-600" />
        <StatCard label="완료된 챌린지" value={completed.length} color="text-green-600" />
        <StatCard label="평균 점수" value={avgScore > 0 ? `${avgScore}점` : '-'} color="text-violet-600" />
      </div>

      {/* 진행 중인 챌린지 */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">진행 중인 챌린지</h2>
        {inProgress.length === 0 ? (
          <p className="text-slate-400 text-sm">진행 중인 챌린지가 없습니다.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {inProgress.map((progress) => {
              const pct = Math.round((progress.currentStep / progress.totalSteps) * 100)
              return (
                <div key={progress.challengeId} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">{progress.challengeTitle}</h3>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {progress.currentStep} / {progress.totalSteps} 단계
                      </p>
                    </div>
                    <Link
                      href={`/challenges/${progress.challengeId}`}
                      className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
                    >
                      계속하기
                    </Link>
                  </div>

                  {/* 진행률 바 */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                      <span>진행률</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* 단계 상태 */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <CicdBadge result={progress.cicdResult} />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* 완료된 챌린지 */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">완료된 챌린지</h2>
        {completed.length === 0 ? (
          <p className="text-slate-400 text-sm">완료된 챌린지가 없습니다.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {completed.map((progress) => (
              <div key={progress.challengeId} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-semibold text-slate-900">{progress.challengeTitle}</h3>
                  {progress.score !== null && (
                    <span className="shrink-0 text-lg font-bold text-green-600">{progress.score}점</span>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <CicdBadge result={progress.cicdResult} />
                  {progress.completedAt && (
                    <span className="text-xs text-slate-400">완료일: {progress.completedAt}</span>
                  )}
                </div>
                {progress.claudeReview && (
                  <div className="bg-violet-50 border border-violet-100 rounded-lg p-3">
                    <p className="text-xs font-medium text-violet-700 mb-1">Claude Code 리뷰</p>
                    <p className="text-sm text-slate-700">{progress.claudeReview}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 최근 평가 결과 */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">최근 평가 결과</h2>
        {myEvaluations.length === 0 ? (
          <p className="text-slate-400 text-sm">평가 결과가 없습니다.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {myEvaluations.map((eval_) => (
              <div key={eval_.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{eval_.challengeTitle}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">평가일: {eval_.evaluatedAt}</p>
                  </div>
                  <span className="shrink-0 text-lg font-bold text-violet-600">{eval_.claudeScore}점</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <CicdBadge result={eval_.cicdStatus} />
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                  <p className="text-xs font-medium text-slate-500 mb-1">Claude 피드백</p>
                  <p className="text-sm text-slate-700">{eval_.claudeFeedback}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
