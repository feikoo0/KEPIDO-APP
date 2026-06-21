'use client';

import React, { useState, useEffect } from 'react';
import { Heart, X, MessageSquare, ArrowLeft, CheckCircle2 } from 'lucide-react';

export interface ReviewData {
  rating: number; // 1 to 5
  selectedMetrics: string[];
  comment?: string;
  date: string;
}

interface QuickReviewProps {
  negocioId: string;
  negocioNombre: string;
  isOpen: boolean;
  onClose: () => void;
}

// Default list of positive metrics
const POSITIVE_METRICS = [
  "Calidad de la comida",
  "Justo lo que pedí",
  "Tal como lo pedí",
  "Buena presentación",
  "La calidad de los ingredientes",
  "Tomó en cuenta mis pedidos",
  "Otras razones"
];

// Default list of negative/issue metrics
const NEGATIVE_METRICS = [
  "No fue lo que pedí",
  "Mala presentación",
  "Faltaron algunos items",
  "Faltó un item",
  "Otras razones"
];

const metricIcons: Record<string, string> = {
  "Calidad de la comida": "🍔",
  "Justo lo que pedí": "⚖️",
  "Tal como lo pedí": "📦",
  "Buena presentación": "📦",
  "La calidad de los ingredientes": "🍔",
  "No fue lo que pedí": "📦",
  "Mala presentación": "📦",
  "Tomó en cuenta mis pedidos": "⚖️",
  "Faltaron algunos items": "⚖️",
  "Faltó un item": "⚖️",
  "Otras razones": "🏪"
};

// Seed mock reviews for a business to show a realistic chart
function getMockReviews(negocioId: string): ReviewData[] {
  const charCodeSum = negocioId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const reviewCount = 12 + (charCodeSum % 18); // 12 to 29 reviews
  const reviews: ReviewData[] = [];
  
  for (let i = 0; i < reviewCount; i++) {
    const seed = (charCodeSum + i) * 17;
    const rating = (seed % 10) < 8 ? 5 : 4; // Mostly 4 and 5 stars
    const selectedMetrics: string[] = [];
    
    // Choose 1 to 3 positive metrics based on seed
    const metricCount = 1 + (seed % 3);
    for (let j = 0; j < metricCount; j++) {
      const idx = (seed + j * 7) % POSITIVE_METRICS.length;
      const m = POSITIVE_METRICS[idx];
      if (!selectedMetrics.includes(m)) {
        selectedMetrics.push(m);
      }
    }
    
    reviews.push({
      rating,
      selectedMetrics,
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  // Add a couple of lower rated reviews for realism
  const lowerCount = 1 + (charCodeSum % 3);
  for (let i = 0; i < lowerCount; i++) {
    const seed = (charCodeSum + i * 23);
    const rating = 2 + (seed % 2); // 2 or 3 stars
    const selectedMetrics: string[] = [];
    
    const metricCount = 1 + (seed % 2);
    for (let j = 0; j < metricCount; j++) {
      const idx = (seed + j * 11) % NEGATIVE_METRICS.length;
      const m = NEGATIVE_METRICS[idx];
      if (!selectedMetrics.includes(m)) {
        selectedMetrics.push(m);
      }
    }
    
    reviews.push({
      rating,
      selectedMetrics,
      date: new Date(Date.now() - (i + 5) * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  return reviews;
}

// Helper to get all reviews for a business from localStorage + mock reviews
export function getBusinessReviews(negocioId: string): ReviewData[] {
  if (typeof window === 'undefined') return [];
  const key = `reviews_${negocioId}`;
  const stored = localStorage.getItem(key);
  
  let userReviews: ReviewData[] = [];
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        userReviews = parsed.map(r => {
          const ratingNum = Number(r.rating);
          return {
            rating: isNaN(ratingNum) ? 5 : ratingNum,
            selectedMetrics: Array.isArray(r.selectedMetrics) ? r.selectedMetrics : [],
            comment: typeof r.comment === 'string' ? r.comment : undefined,
            date: typeof r.date === 'string' ? r.date : new Date().toISOString()
          };
        });
      }
    } catch {
      userReviews = [];
    }
  }
  
  const mockReviews = getMockReviews(negocioId);
  return [...mockReviews, ...userReviews];
}

// Helper to calculate approval percentage
export function getApprovalPercent(negocioId: string): { percent: number; total: number } | null {
  const reviews = getBusinessReviews(negocioId);
  const validReviews = reviews.filter(r => r && typeof r.rating === 'number' && !isNaN(r.rating));
  if (validReviews.length === 0) return null;
  const positive = validReviews.filter(r => r.rating >= 4).length;
  return {
    percent: Math.round((positive / validReviews.length) * 100),
    total: validReviews.length,
  };
}

// Helper to calculate average rating
export function getBusinessRating(negocioId: string, baseRating: number = 5.0, baseTotal: number = 10): { rating: number; total: number } {
  const reviews = getBusinessReviews(negocioId);
  const validReviews = reviews.filter(r => r && typeof r.rating === 'number' && !isNaN(r.rating));
  if (validReviews.length === 0) return { rating: baseRating, total: baseTotal };
  
  const sum = validReviews.reduce((acc, r) => acc + r.rating, 0);
  return {
    rating: Math.round((sum / validReviews.length) * 10) / 10,
    total: validReviews.length
  };
}

export interface MetricSummary {
  name: string;
  percent: number;
  count: number;
  icon: string;
}

// Helper to get business metrics summary sorted descending
export function getBusinessMetrics(negocioId: string): MetricSummary[] {
  const reviews = getBusinessReviews(negocioId);
  const counts: Record<string, number> = {};
  
  const allPossibleMetrics = [...POSITIVE_METRICS, ...NEGATIVE_METRICS];
  const uniqueMetrics = Array.from(new Set(allPossibleMetrics));
  
  uniqueMetrics.forEach(m => {
    counts[m] = 0;
  });
  
  reviews.forEach(r => {
    if (r.selectedMetrics) {
      r.selectedMetrics.forEach(m => {
        if (m in counts) {
          counts[m]++;
        }
      });
    }
  });

  const totalReviews = reviews.length;
  
  const list = uniqueMetrics.map(name => {
    const count = counts[name];
    const percent = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return {
      name,
      percent,
      count,
      icon: metricIcons[name] || '💡'
    };
  });
  
  // Return only metrics with at least 1 selection, sorted descending by percentage
  return list
    .filter(m => m.count > 0)
    .sort((a, b) => b.percent - a.percent);
}

export default function QuickReview({ negocioId, negocioNombre, isOpen, onClose }: QuickReviewProps) {
  const [viewMode, setViewMode] = useState<'chart' | 'form'>('chart');
  const [rating, setRating] = useState<number>(5);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [metricsSummary, setMetricsSummary] = useState<MetricSummary[]>([]);

  // Load metrics chart details when modal opens
  useEffect(() => {
    if (isOpen) {
      setViewMode('chart');
      setRating(5);
      setSelectedMetrics([]);
      setComment('');
      setSubmitted(false);
      setMetricsSummary(getBusinessMetrics(negocioId));
    }
  }, [isOpen, negocioId]);

  const handleMetricToggle = (metricName: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricName) 
        ? prev.filter(m => m !== metricName)
        : [...prev, metricName]
    );
  };

  const handleSubmit = () => {
    const review: ReviewData = {
      rating,
      selectedMetrics,
      comment: comment.trim() || undefined,
      date: new Date().toISOString(),
    };

    // Save to localStorage
    const key = `reviews_${negocioId}`;
    const stored = localStorage.getItem(key);
    let existingUserReviews: ReviewData[] = [];
    if (stored) {
      try {
        existingUserReviews = JSON.parse(stored);
      } catch {}
    }
    existingUserReviews.push(review);
    localStorage.setItem(key, JSON.stringify(existingUserReviews));

    setSubmitted(true);
    
    // Refresh chart in background
    setTimeout(() => {
      setMetricsSummary(getBusinessMetrics(negocioId));
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  // Filter selectable metrics based on chosen rating
  const availableOptionsForForm = rating >= 4 ? POSITIVE_METRICS : NEGATIVE_METRICS;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl p-5 w-full max-w-sm shadow-2xl border border-gray-100 animate-slide-up flex flex-col max-h-[85vh]">
        
        {/* Header bar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 relative">
          {viewMode === 'form' && !submitted && (
            <button
              onClick={() => setViewMode('chart')}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <h3 className="font-semibold text-[16px] text-gray-900 mx-auto">
            {viewMode === 'chart' ? 'Calificaciones y opiniones' : 'Tu opinión'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer absolute right-0"
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          /* Success message block */
          <div className="text-center py-10 space-y-3">
            <div className="flex justify-center">
              <CheckCircle2 size={48} className="text-emerald-500 animate-bounce" />
            </div>
            <h3 className="font-semibold text-gray-900 text-[18px]">¡Gracias por calificar!</h3>
            <p className="text-[12px] text-gray-500 max-w-[80%] mx-auto">
              Tu opinión es muy valiosa para nosotros y para la comunidad de Jamay.
            </p>
          </div>
        ) : (
          <div className="overflow-y-auto no-scrollbar flex-1 py-4 space-y-4">
            {viewMode === 'chart' ? (
              /* CHART DISPLAY SCREEN */
              <>
                <div className="text-center space-y-0.5">
                  <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wider">
                    {negocioNombre}
                  </span>
                  <div className="flex items-center justify-center gap-1.5 pt-1">
                    <span className="text-[32px] font-bold text-slate-800">
                      {getBusinessRating(negocioId).rating.toFixed(1)}
                    </span>
                    <div className="flex flex-col items-start leading-none">
                      <div className="flex gap-0.5 text-rose-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Heart
                            key={i}
                            size={12}
                            className={i < Math.round(getBusinessRating(negocioId).rating) ? 'fill-rose-500' : 'text-gray-200'}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium mt-0.5">
                        Basado en {getBusinessRating(negocioId).total} opiniones
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bars list */}
                <div className="space-y-3 pt-2">
                  {metricsSummary.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-[12px]">
                      Aún no hay votos detallados. ¡Sé el primero en calificar!
                    </div>
                  ) : (
                    metricsSummary.map((metric, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between items-center text-[12px] font-bold text-gray-800">
                          <span className="flex items-center gap-1.5">
                            <span>{metric.icon}</span>
                            <span>{metric.name}</span>
                          </span>
                          <span className="text-gray-500 font-medium">{metric.percent}%</span>
                        </div>
                        {/* Progress bar container */}
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-slate-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${metric.percent}%` }}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Rate button */}
                <button
                  onClick={() => setViewMode('form')}
                  className="w-full mt-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[13px] font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  Opinar sobre este negocio
                </button>
              </>
            ) : (
              /* FORM SUBMISSION SCREEN */
              <>
                {/* Heart Selector */}
                <div className="text-center space-y-1">
                  <p className="text-[12px] text-gray-400 font-bold">¿CÓMO CALIFICAS TU EXPERIENCIA?</p>
                  <div className="flex justify-center gap-2 pt-1.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => {
                          setRating(star);
                          setSelectedMetrics([]); // reset metrics selector if rating changes to load positive/negative metrics
                        }}
                        className="cursor-pointer transition-all active:scale-120 hover:scale-105 p-1"
                        aria-label={`Calificar con ${star} corazones`}
                      >
                        <Heart
                          size={28}
                          className={`${
                            star <= rating
                              ? 'fill-rose-500 text-rose-500'
                              : 'text-gray-200 hover:text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Metrics Chip Selectors */}
                <div className="space-y-2 pt-2">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center">
                    {rating >= 4 ? '¿Qué fue lo mejor?' : '¿Qué podemos mejorar?'}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {availableOptionsForForm.map(metric => {
                      const isSelected = selectedMetrics.includes(metric);
                      return (
                        <button
                          key={metric}
                          onClick={() => handleMetricToggle(metric)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <span>{metricIcons[metric]}</span>
                          <span>{metric}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Optional comment text box */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold">
                    <span>COMENTARIO COMPLEMENTARIO</span>
                    <span>{comment.length}/100</span>
                  </div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value.slice(0, 100))}
                    placeholder="Escribe un comentario corto..."
                    className="w-full p-3 border border-gray-200 rounded-xl text-[12px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 resize-none h-20 transition-all"
                  />
                </div>

                {/* Submit buttons */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[13px] font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Enviar Calificación
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
