'use client';

import { useEffect, useRef } from 'react';
import { REVIEWS } from '@/data/reviews';

export function Reviews() {
  const looped = [...REVIEWS, ...REVIEWS];
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="reviews-section fade-in">
      <div className="reviews-top">
        <div className="reviews-left-title">
          <span className="reviews-label">Avaliações do Google</span>
          <h2 className="reviews-title">O que dizem<br />nossos Clientes</h2>
          <p className="reviews-source">Avaliações verificadas pelo Google</p>
        </div>
        <div className="reviews-score-box">
          <div className="reviews-score-number">5,0</div>
          <div className="reviews-stars">★★★★★</div>
          <div className="reviews-score-label">Média de Avaliações</div>
          <div className="reviews-count">Baseado em 33 avaliações</div>
        </div>
      </div>

      <div className="reviews-track-wrapper">
        <div className="reviews-track">
          {looped.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-card-header">
                <div className="review-avatar" style={{ background: r.avatarGradient }} aria-hidden="true">
                  {r.initial}
                </div>
                <div className="review-author-info">
                  <div className="review-author-name">{r.author}</div>
                  <div className="review-date">{r.date}</div>
                </div>
              </div>
              <div className="review-stars-row" aria-label={`${r.stars} estrelas`}>
                {'★'.repeat(r.stars)}
              </div>
              <p className="review-text">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
