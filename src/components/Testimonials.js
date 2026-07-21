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

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.h4`
  font-size: 1rem;
  margin-bottom: 0.2rem;
  color: ${props => props.theme.text.primary};
`;

const AuthorTitle = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.text.secondary};
`;

const Testimonials = () => {
  const testimonialData = [
    {
      rating: 5,
      text: "Having every case on one pipeline, from intake through settlement, has completely changed how we manage our caseload. We always know exactly where each file stands.",
      author: {
        name: "Sarah Johnson",
        title: "Managing Partner, Johnson & Associates",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg"
      }
    },
    {
      rating: 5,
      text: "After trying several CRM solutions, we finally found one that understands personal injury work. Being able to see which documents are signed versus still pending signature saves us a phone call every time.",
      author: {
        name: "Michael Rodriguez",
        title: "Attorney, Rodriguez Law Group",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg"
      }
    },
    {
      rating: 5,
      text: "The reporting features have given us incredible insights into our firm's performance. We've been able to identify bottlenecks and optimize our processes, resulting in faster case resolutions.",
      author: {
        name: "Jennifer Chen",
        title: "Operations Manager, Chen Legal",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg"
      }
    },
  ];

  return (
    <TestimonialsSection id="testimonials">
      <div className="container">
        <SectionTitle>What Our Clients Say</SectionTitle>
        <SectionSubtitle>
          Don't just take our word for it. Here's what law firms using our CRM have to say.
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
                <AuthorAvatar>
                  <img src={testimonial.author.avatar} alt={testimonial.author.name} />
                </AuthorAvatar>
                <AuthorInfo>
                  <AuthorName>{testimonial.author.name}</AuthorName>
                  <AuthorTitle>{testimonial.author.title}</AuthorTitle>
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
