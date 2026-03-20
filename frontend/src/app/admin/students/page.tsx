'use client'

import { useState } from 'react'
import { students, Student, StudentChallengeProgress } from '@/data/mock'

function CicdBadge({ result }: { result: StudentChallengeProgress['cicdResult'] }) {
  if (!result) return <span className="text-xs text-slate-400">-</span>
  const styles = {
    pass: 'bg-green-100 text-green-700',
    fail: 'bg-red-100 text-red-700',
    pending: 'bg-yellow-100 text-yellow-700',
  }
  const labels = { pass: '통과', fail: '실패', pending: '대기' }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[result]}`}>
      {labels[result]}
    </span>
  )
}

function StatusBadge({ status }: { status: StudentChallengeProgress['status'] }) {
  const styles = {
    completed: 'bg-green-100 text-green-700',
    in_progress: 'bg-blue-100 text-blue-700',
    not_started: 'bg-slate-100 text-slate-500',
  }
  const labels = { completed: '완료', in_progress: '진행 중', not_started: '미시작' }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

function getStudentStats(student: Student) {
  const inProgress = student.challengeProgress.filter((p) => p.status === 'in_progress').length
  const completed = student.challengeProgress.filter((p) => p.status === 'completed').length
  const scores = student.challengeProgress
    .map((p) => p.score)
    .filter((s): s is number => s !== null)
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null
  return { inProgress, completed, avgScore }
}

function ExpandedDetail({ progress }: { progress: StudentChallengeProgress }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-3 bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 truncate">{progress.challengeTitle}</p>
        <p className="text-xs text-slate-500 mt-0.5">
          단계: {progress.currentStep} / {progress.totalSteps}
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <StatusBadge status={progress.status} />
        <span className="text-xs text-slate-500">CI/CD:</span>
        <CicdBadge result={progress.cicdResult} />
        {progress.score !== null && (
          <span className="text-xs font-semibold text-violet-600">{progress.score}점</span>
        )}
      </div>
      {progress.claudeReview && (
        <div className="w-full sm:w-auto sm:max-w-xs bg-violet-50 border border-violet-100 rounded-lg px-3 py-2">
          <p className="text-xs font-medium text-violet-700 mb-0.5">Claude 피드백</p>
          <p className="text-xs text-slate-600 leading-relaxed">{progress.claudeReview}</p>
        </div>
      )}
    </div>
  )
}

export default function AdminStudentsPage() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  function toggleExpand(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // 전체 통계
  const totalStudents = students.length
  const totalInProgress = students.reduce(
    (acc, s) => acc + s.challengeProgress.filter((p) => p.status === 'in_progress').length,
    0
  )
  const totalCompleted = students.reduce(
    (acc, s) => acc + s.challengeProgress.filter((p) => p.status === 'completed').length,
    0
  )
  const totalProgress = students.reduce((acc, s) => acc + s.challengeProgress.length, 0)
  const completionRate = totalProgress > 0 ? Math.round((totalCompleted / totalProgress) * 100) : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">수강생 모니터링</h1>
        <p className="text-slate-500 mt-1">전체 수강생의 챌린지 진행 현황을 모니터링합니다.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-1">전체 수강생</p>
          <p className="text-2xl font-bold text-slate-900">{totalStudents}명</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-1">진행 중</p>
          <p className="text-2xl font-bold text-blue-600">{totalInProgress}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-1">완료</p>
          <p className="text-2xl font-bold text-green-600">{totalCompleted}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-1">전체 완료율</p>
          <p className="text-2xl font-bold text-violet-600">{completionRate}%</p>
        </div>
      </div>

      {/* 수강생 목록 */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">이름</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">이메일</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">가입일</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">진행중</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">완료</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">평균점수</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">상세</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const { inProgress, completed, avgScore } = getStudentStats(student)
              const isExpanded = expandedIds.has(student.id)

              return (
                <>
                  <tr
                    key={student.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => toggleExpand(student.id)}
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-900">{student.name}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{student.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{student.joinedAt}</td>
                    <td className="px-6 py-4 text-right text-sm text-blue-600 font-medium">{inProgress}</td>
                    <td className="px-6 py-4 text-right text-sm text-green-600 font-medium">{completed}</td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-violet-600">
                      {avgScore !== null ? `${avgScore}점` : '-'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        className="text-slate-400 hover:text-slate-700 transition-colors"
                        aria-label={isExpanded ? '접기' : '펼치기'}
                        onClick={(e) => { e.stopPropagation(); toggleExpand(student.id) }}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr key={`${student.id}-detail`}>
                      <td colSpan={7} className="px-6 py-4 bg-slate-50 border-b border-slate-100">
                        <div className="flex flex-col gap-3">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            챌린지 진행 상세
                          </p>
                          {student.challengeProgress.length === 0 ? (
                            <p className="text-sm text-slate-400">진행 중인 챌린지 없음</p>
                          ) : (
                            student.challengeProgress.map((progress) => (
                              <ExpandedDetail key={progress.challengeId} progress={progress} />
                            ))
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
