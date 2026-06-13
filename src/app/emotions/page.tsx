import { EmotionSelector } from '@/components/emotion/EmotionSelector';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Way — Emotion Selection',
  description: 'Choose your current emotion to begin your spiritual journey.',
};

export default function EmotionSelectionPage() {
  return <EmotionSelector />;
}
