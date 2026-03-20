'use client'

import { useState } from 'react'
import { challenges, Challenge } from '@/data/mock'

const difficultyColor = {
  '초급': 'bg-green-100 text-green-700',
  '중급': 'bg-yellow-100 text-yellow-700',
  '고급': 'bg-red-100 text-red-700',
}

function DifficultyBadge({ difficulty }: { difficulty: Challenge['difficulty'] }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColor[difficulty]}`}>
      {difficulty}
    </span>
  )
}

interface NewChallengeForm {
  title: string
  description: string
  techStack: string
  difficulty: Challenge['difficulty']
  realWorldApp: string
  repoUrl: string
}

const emptyForm: NewChallengeForm = {
  title: '',
  description: '',
  techStack: '',
  difficulty: '초급',
  realWorldApp: '',
  repoUrl: '',
}

export default function AdminChallengesPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState<NewChallengeForm>(emptyForm)

  function handleClose() {
    setModalOpen(false)
    setForm(emptyForm)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    // 목업 — 실제 저장 불필요
    handleClose()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">챌린지 관리</h1>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
        >
          + 새 챌린지 등록
        </button>
      </div>

      {/* 데스크톱 테이블 / 모바일 스크롤 */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">제목</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">기술스택</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">난이도</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">수강생</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">완료</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">액션</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {challenges.map((challenge) => (
              <tr key={challenge.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900 text-sm">{challenge.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{challenge.realWorldApp}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {challenge.techStack.map((tech) => (
                      <span key={tech} className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <DifficultyBadge difficulty={challenge.difficulty} />
                </td>
                <td className="px-6 py-4 text-right text-sm text-slate-700">{challenge.enrolledCount}</td>
                <td className="px-6 py-4 text-right text-sm text-slate-700">{challenge.completedCount}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors px-2 py-1 rounded hover:bg-blue-50"
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors px-2 py-1 rounded hover:bg-red-50"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 새 챌린지 등록 모달 */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 오버레이 */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* 모달 */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">새 챌린지 등록</h2>
              <button
                type="button"
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="닫기"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">제목</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="챌린지 제목"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">설명</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="챌린지 설명"
                  rows={3}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">기술스택 (콤마 구분)</label>
                <input
                  type="text"
                  name="techStack"
                  value={form.techStack}
                  onChange={handleChange}
                  placeholder="예: React, TypeScript, Jest"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">난이도</label>
                <select
                  name="difficulty"
                  value={form.difficulty}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="초급">초급</option>
                  <option value="중급">중급</option>
                  <option value="고급">고급</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">리얼월드 앱 이름</label>
                <input
                  type="text"
                  name="realWorldApp"
                  value={form.realWorldApp}
                  onChange={handleChange}
                  placeholder="예: TodoMVC React"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">레포 URL</label>
                <input
                  type="url"
                  name="repoUrl"
                  value={form.repoUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 mt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-sm font-medium text-slate-600 hover:text-slate-800 px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md transition-colors"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
