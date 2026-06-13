'use client';

interface EmotionHeaderProps {
  subtitle?: string;
}

export function EmotionHeader({ subtitle = '꺼지지 않는 질문이 있습니다' }: EmotionHeaderProps) {
  return (
    <div className="w-full pt-8 px-6 pb-4" style={{ backgroundColor: '#1A1F3A' }}>
      <h1 className="text-4xl font-semibold mb-4 leading-tight" style={{ color: '#F5F1E8' }}>
        오늘 당신의 마음은<br />
        어떠한가요?
      </h1>
      <p className="text-sm" style={{ color: '#D4C8B8' }}>
        {subtitle}
      </p>
    </div>
  );
}
