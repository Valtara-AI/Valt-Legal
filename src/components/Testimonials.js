import React from 'react';
import styled from 'styled-components';
import { FiStar } from 'react-icons/fi';

const TestimonialsSection = styled.section`
  background-color: ${props => props.theme.background};
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: ${props => props.theme.text.primary};
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: ${props => props.theme.primary};
    margin: 1rem auto 0;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
  color: ${props => props.theme.text.secondary};
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled.div`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px ${props => props.theme.shadow};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px ${props => props.theme.shadow};
  }
`;

const TestimonialRating = styled.div`
  display: flex;
  color: #FFD700;
  margin-bottom: 1rem;
`;

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.text.primary};
  line-height: 1.6;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorInfo = styled.div``;

const AuthorTitle = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.theme.text.secondary};
`;

const Testimonials = () => {
  // Persona-based statements grounded in this app's actual features (case
  // pipeline, document/signature tracking, reporting) — not real customer
  // quotes. Intentionally has no names, firms, or photos attached: earlier
  // drafts paired stock photos with invented firm names ("Johnson &
  // Associates", "Rodriguez Law Group", "Chen Legal") that turned out to
  // resemble real, identifiable personal injury practices, so this section
  // was rewritten to be clearly illustrative instead of misrepresented as
  // verified customer testimonials.
  const testimonialData = [
    {
      rating: 5,
      text: "Having every case on one pipeline, from intake through settlement, would completely change how a firm manages its caseload — always knowing exactly where each file stands.",
      persona: "Managing Partner, small PI firm"
    },
    {
      rating: 5,
      text: "For a firm juggling several CRM tools, seeing which documents are signed versus still pending signature at a glance would save a phone call every time.",
      persona: "Attorney, solo practice"
    },
    {
      rating: 5,
      text: "Live reporting on active cases, new intakes, and settlement values gives a firm the visibility to spot bottlenecks and speed up case resolutions.",
      persona: "Operations lead, growing firm"
    },
  ];

  return (
    <TestimonialsSection id="testimonials">
      <div className="container">
        <SectionTitle>Built For Firms Like Yours</SectionTitle>
        <SectionSubtitle>
          Illustrative — demo content. These reflect the workflows this CRM is built to support, not verified customer quotes.
        </SectionSubtitle>

        <TestimonialsGrid>
          {testimonialData.map((testimonial, index) => (
            <TestimonialCard key={index}>
              <TestimonialRating>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} />
                ))}
              </TestimonialRating>
              <TestimonialText>"{testimonial.text}"</TestimonialText>
              <TestimonialAuthor>
                <AuthorInfo>
                  <AuthorTitle>{testimonial.persona}</AuthorTitle>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </div>
    </TestimonialsSection>
  );
};

export default Testimonials;
