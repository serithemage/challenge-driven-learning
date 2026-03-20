export interface Challenge {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  difficulty: "초급" | "중급" | "고급";
  realWorldApp: string;
  repoUrl: string;
  enrolledCount: number;
  completedCount: number;
  steps: ChallengeStep[];
}

export interface ChallengeStep {
  id: number;
  name: string;
  description: string;
  status: "completed" | "in_progress" | "pending";
}

export interface Student {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  challengeProgress: StudentChallengeProgress[];
}

export interface StudentChallengeProgress {
  challengeId: string;
  challengeTitle: string;
  currentStep: number;
  totalSteps: number;
  status: "completed" | "in_progress" | "not_started";
  score: number | null;
  cicdResult: "pass" | "fail" | "pending" | null;
  claudeReview: string | null;
  startedAt: string;
  completedAt: string | null;
}

export interface EvaluationResult {
  id: string;
  challengeTitle: string;
  studentName: string;
  cicdStatus: "pass" | "fail" | "pending";
  claudeScore: number;
  claudeFeedback: string;
  evaluatedAt: string;
}

export const challenges: Challenge[] = [
  {
    id: "1",
    title: "React Todo App 문서화 & 테스트",
    description:
      "React 기반 Todo 앱의 문서화, 테스트 자동화, Claude Code 훅과 스킬을 구현합니다.",
    techStack: ["React", "TypeScript", "Jest"],
    difficulty: "초급",
    realWorldApp: "TodoMVC React",
    repoUrl: "https://github.com/example/todomvc-react",
    enrolledCount: 45,
    completedCount: 32,
    steps: [
      {
        id: 1,
        name: "결과물 정의",
        description: "최종 산출물의 명확한 요구사항을 정의합니다.",
        status: "completed",
      },
      {
        id: 2,
        name: "문서화",
        description: "프로젝트 README, API 문서, 아키텍처 문서를 생성합니다.",
        status: "completed",
      },
      {
        id: 3,
        name: "테스트 자동화",
        description: "단위 테스트와 통합 테스트를 작성합니다.",
        status: "in_progress",
      },
      {
        id: 4,
        name: "훅 구현",
        description: "Claude Code 훅을 설계하고 구현합니다.",
        status: "pending",
      },
      {
        id: 5,
        name: "스킬 구현",
        description: "Claude Code 스킬(.md)을 설계하고 구현합니다.",
        status: "pending",
      },
    ],
  },
  {
    id: "2",
    title: "Express REST API 품질 개선",
    description:
      "Express.js REST API의 문서화, 테스트 커버리지 확대, Claude Code 자동화를 구현합니다.",
    techStack: ["Node.js", "Express", "MongoDB"],
    difficulty: "중급",
    realWorldApp: "RealWorld Conduit API",
    repoUrl: "https://github.com/example/conduit-express",
    enrolledCount: 38,
    completedCount: 15,
    steps: [
      {
        id: 1,
        name: "결과물 정의",
        description: "최종 산출물의 명확한 요구사항을 정의합니다.",
        status: "completed",
      },
      {
        id: 2,
        name: "문서화",
        description: "OpenAPI 스펙 및 프로젝트 문서를 생성합니다.",
        status: "in_progress",
      },
      {
        id: 3,
        name: "테스트 자동화",
        description: "API 엔드포인트 테스트를 작성합니다.",
        status: "pending",
      },
      {
        id: 4,
        name: "훅 구현",
        description: "Claude Code 훅을 설계하고 구현합니다.",
        status: "pending",
      },
      {
        id: 5,
        name: "스킬 구현",
        description: "Claude Code 스킬(.md)을 설계하고 구현합니다.",
        status: "pending",
      },
    ],
  },
  {
    id: "3",
    title: "Spring Boot 마이크로서비스 자동화",
    description:
      "Spring Boot 마이크로서비스의 문서화, 통합 테스트, Claude Code 워크플로우를 구축합니다.",
    techStack: ["Java", "Spring Boot", "PostgreSQL"],
    difficulty: "고급",
    realWorldApp: "RealWorld Spring Boot",
    repoUrl: "https://github.com/example/realworld-spring",
    enrolledCount: 22,
    completedCount: 5,
    steps: [
      {
        id: 1,
        name: "결과물 정의",
        description: "최종 산출물의 명확한 요구사항을 정의합니다.",
        status: "pending",
      },
      {
        id: 2,
        name: "문서화",
        description: "Javadoc 및 아키텍처 문서를 생성합니다.",
        status: "pending",
      },
      {
        id: 3,
        name: "테스트 자동화",
        description: "JUnit 통합 테스트를 작성합니다.",
        status: "pending",
      },
      {
        id: 4,
        name: "훅 구현",
        description: "Claude Code 훅을 설계하고 구현합니다.",
        status: "pending",
      },
      {
        id: 5,
        name: "스킬 구현",
        description: "Claude Code 스킬(.md)을 설계하고 구현합니다.",
        status: "pending",
      },
    ],
  },
  {
    id: "4",
    title: "Django 웹앱 품질 파이프라인",
    description:
      "Django 웹 애플리케이션의 문서화, pytest 기반 테스트, Claude Code 통합을 구현합니다.",
    techStack: ["Python", "Django", "PostgreSQL"],
    difficulty: "중급",
    realWorldApp: "RealWorld Django",
    repoUrl: "https://github.com/example/realworld-django",
    enrolledCount: 30,
    completedCount: 12,
    steps: [
      {
        id: 1,
        name: "결과물 정의",
        description: "최종 산출물의 명확한 요구사항을 정의합니다.",
        status: "completed",
      },
      {
        id: 2,
        name: "문서화",
        description: "Sphinx 기반 문서를 생성합니다.",
        status: "completed",
      },
      {
        id: 3,
        name: "테스트 자동화",
        description: "pytest 테스트를 작성합니다.",
        status: "completed",
      },
      {
        id: 4,
        name: "훅 구현",
        description: "Claude Code 훅을 설계하고 구현합니다.",
        status: "in_progress",
      },
      {
        id: 5,
        name: "스킬 구현",
        description: "Claude Code 스킬(.md)을 설계하고 구현합니다.",
        status: "pending",
      },
    ],
  },
  {
    id: "5",
    title: "Go CLI 도구 문서화 & 테스트",
    description:
      "Go 기반 CLI 도구의 문서화, 테이블 드리븐 테스트, Claude Code 자동화를 구현합니다.",
    techStack: ["Go", "Cobra", "SQLite"],
    difficulty: "중급",
    realWorldApp: "Task CLI Tool",
    repoUrl: "https://github.com/example/task-cli-go",
    enrolledCount: 18,
    completedCount: 7,
    steps: [
      {
        id: 1,
        name: "결과물 정의",
        description: "최종 산출물의 명확한 요구사항을 정의합니다.",
        status: "pending",
      },
      {
        id: 2,
        name: "문서화",
        description: "GoDoc 및 사용자 가이드를 생성합니다.",
        status: "pending",
      },
      {
        id: 3,
        name: "테스트 자동화",
        description: "테이블 드리븐 테스트를 작성합니다.",
        status: "pending",
      },
      {
        id: 4,
        name: "훅 구현",
        description: "Claude Code 훅을 설계하고 구현합니다.",
        status: "pending",
      },
      {
        id: 5,
        name: "스킬 구현",
        description: "Claude Code 스킬(.md)을 설계하고 구현합니다.",
        status: "pending",
      },
    ],
  },
  {
    id: "6",
    title: "Next.js 풀스택 앱 자동화",
    description:
      "Next.js 풀스택 애플리케이션의 E2E 테스트, 문서화, Claude Code 워크플로우를 구축합니다.",
    techStack: ["Next.js", "TypeScript", "Prisma"],
    difficulty: "고급",
    realWorldApp: "T3 Stack App",
    repoUrl: "https://github.com/example/t3-app",
    enrolledCount: 25,
    completedCount: 3,
    steps: [
      {
        id: 1,
        name: "결과물 정의",
        description: "최종 산출물의 명확한 요구사항을 정의합니다.",
        status: "pending",
      },
      {
        id: 2,
        name: "문서화",
        description: "프로젝트 구조 및 API 문서를 생성합니다.",
        status: "pending",
      },
      {
        id: 3,
        name: "테스트 자동화",
        description: "Playwright E2E 테스트를 작성합니다.",
        status: "pending",
      },
      {
        id: 4,
        name: "훅 구현",
        description: "Claude Code 훅을 설계하고 구현합니다.",
        status: "pending",
      },
      {
        id: 5,
        name: "스킬 구현",
        description: "Claude Code 스킬(.md)을 설계하고 구현합니다.",
        status: "pending",
      },
    ],
  },
];

export const students: Student[] = [
  {
    id: "s1",
    name: "김민수",
    email: "minsu@example.com",
    joinedAt: "2026-01-15",
    challengeProgress: [
      {
        challengeId: "1",
        challengeTitle: "React Todo App 문서화 & 테스트",
        currentStep: 3,
        totalSteps: 5,
        status: "in_progress",
        score: null,
        cicdResult: "pass",
        claudeReview: null,
        startedAt: "2026-02-01",
        completedAt: null,
      },
      {
        challengeId: "4",
        challengeTitle: "Django 웹앱 품질 파이프라인",
        currentStep: 5,
        totalSteps: 5,
        status: "completed",
        score: 92,
        cicdResult: "pass",
        claudeReview: "문서화 품질이 우수합니다. 테스트 커버리지 85% 달성.",
        startedAt: "2026-01-20",
        completedAt: "2026-02-28",
      },
    ],
  },
  {
    id: "s2",
    name: "이서연",
    email: "seoyeon@example.com",
    joinedAt: "2026-02-01",
    challengeProgress: [
      {
        challengeId: "2",
        challengeTitle: "Express REST API 품질 개선",
        currentStep: 2,
        totalSteps: 5,
        status: "in_progress",
        score: null,
        cicdResult: "pending",
        claudeReview: null,
        startedAt: "2026-02-10",
        completedAt: null,
      },
    ],
  },
  {
    id: "s3",
    name: "박지훈",
    email: "jihoon@example.com",
    joinedAt: "2026-01-10",
    challengeProgress: [
      {
        challengeId: "1",
        challengeTitle: "React Todo App 문서화 & 테스트",
        currentStep: 5,
        totalSteps: 5,
        status: "completed",
        score: 88,
        cicdResult: "pass",
        claudeReview: "훅 구현이 깔끔합니다. 스킬 문서에 예시를 더 추가하면 좋겠습니다.",
        startedAt: "2026-01-15",
        completedAt: "2026-02-20",
      },
      {
        challengeId: "3",
        challengeTitle: "Spring Boot 마이크로서비스 자동화",
        currentStep: 1,
        totalSteps: 5,
        status: "in_progress",
        score: null,
        cicdResult: null,
        claudeReview: null,
        startedAt: "2026-03-01",
        completedAt: null,
      },
    ],
  },
  {
    id: "s4",
    name: "최유진",
    email: "yujin@example.com",
    joinedAt: "2026-02-15",
    challengeProgress: [
      {
        challengeId: "5",
        challengeTitle: "Go CLI 도구 문서화 & 테스트",
        currentStep: 4,
        totalSteps: 5,
        status: "in_progress",
        score: null,
        cicdResult: "fail",
        claudeReview: "테스트 3건 실패. edge case 처리가 필요합니다.",
        startedAt: "2026-02-20",
        completedAt: null,
      },
    ],
  },
  {
    id: "s5",
    name: "정도현",
    email: "dohyun@example.com",
    joinedAt: "2026-03-01",
    challengeProgress: [
      {
        challengeId: "6",
        challengeTitle: "Next.js 풀스택 앱 자동화",
        currentStep: 2,
        totalSteps: 5,
        status: "in_progress",
        score: null,
        cicdResult: "pass",
        claudeReview: null,
        startedAt: "2026-03-05",
        completedAt: null,
      },
    ],
  },
];

export const evaluationResults: EvaluationResult[] = [
  {
    id: "e1",
    challengeTitle: "React Todo App 문서화 & 테스트",
    studentName: "박지훈",
    cicdStatus: "pass",
    claudeScore: 88,
    claudeFeedback: "훅 구현이 깔끔합니다. 스킬 문서에 예시를 더 추가하면 좋겠습니다.",
    evaluatedAt: "2026-02-20",
  },
  {
    id: "e2",
    challengeTitle: "Django 웹앱 품질 파이프라인",
    studentName: "김민수",
    cicdStatus: "pass",
    claudeScore: 92,
    claudeFeedback: "문서화 품질이 우수합니다. 테스트 커버리지 85% 달성.",
    evaluatedAt: "2026-02-28",
  },
  {
    id: "e3",
    challengeTitle: "Go CLI 도구 문서화 & 테스트",
    studentName: "최유진",
    cicdStatus: "fail",
    claudeScore: 65,
    claudeFeedback: "테스트 3건 실패. edge case 처리가 필요합니다.",
    evaluatedAt: "2026-03-15",
  },
];

export const techStackFilters = [
  "전체",
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "Java",
  "Spring Boot",
  "Python",
  "Django",
  "Go",
  "Next.js",
];
