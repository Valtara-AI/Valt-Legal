import React, { useState } from 'react';
import styled from 'styled-components';
import { FiPlus, FiFilter, FiSearch, FiChevronDown } from 'react-icons/fi';

const CasesContainer = styled.div``;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  color: ${props => props.theme.text.primary};
  margin-bottom: 0;
`;

const PageActions = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    margin-top: 1rem;
    width: 100%;
  }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  background-color: ${props => props.primary ? props.theme.primary : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.text.primary};
  border: ${props => props.primary ? 'none' : `1px solid ${props.theme.divider}`};
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background-color: ${props => props.primary ? props.theme.secondary : props.theme.background};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const SearchBar = styled.div`
  position: relative;
  width: 300px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.6rem 1rem 0.6rem 2.5rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.divider};
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text.primary};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.text.secondary};
`;

const FilterActions = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1rem;
  background-color: transparent;
  color: ${props => props.theme.text.primary};
  border: 1px solid ${props => props.theme.divider};
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background-color: ${props => props.theme.background};
  }
`;

const SelectFilter = styled.div`
  position: relative;
  min-width: 150px;
`;

const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.6rem 1rem;
  background-color: transparent;
  color: ${props => props.theme.text.primary};
  border: 1px solid ${props => props.theme.divider};
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  svg {
    margin-left: 0.5rem;
  }
  
  &:hover {
    background-color: ${props => props.theme.background};
  }
`;

const CasesTable = styled.div`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  box-shadow: 0 2px 4px ${props => props.theme.shadow};
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  padding: 1rem 1.5rem;
  background-color: ${props => props.theme.background};
  border-bottom: 1px solid ${props => props.theme.divider};
  font-weight: 600;
  color: ${props => props.theme.text.primary};
  
  @media (max-width: 992px) {
    display: none;
  }
`;

const TableHeaderCell = styled.div`
  display: flex;
  align-items: center;
`;

const TableBody = styled.div``;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${props => props.theme.divider};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${props => props.theme.background};
  }
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding: 1rem;
  }
`;

const TableCell = styled.div`
  @media (max-width: 992px) {
    display: ${props => props.hideOnMobile ? 'none' : 'grid'};
    grid-template-columns: 1fr 1fr;
    
    &:before {
      content: '${props => props.label}';
      font-weight: 600;
    }
  }
`;

const CaseTitle = styled.div`
  font-weight: 500;
  color: ${props => props.theme.text.primary};
`;

const CaseNumber = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.text.secondary};
  
  @media (max-width: 992px) {
    display: none;
  }
`;

const CaseStatus = styled.div`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => {
    switch(props.status) {
      case 'Urgent':
        return props.theme.error + '20';
      case 'Active':
        return props.theme.success + '20';
      case 'Pending':
        return props.theme.warning + '20';
      default:
        return props.theme.text.secondary + '20';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'Urgent':
        return props.theme.error;
      case 'Active':
        return props.theme.success;
      case 'Pending':
        return props.theme.warning;
      default:
        return props.theme.text.secondary;
    }
  }};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const PaginationInfo = styled.div`
  color: ${props => props.theme.text.secondary};
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PaginationButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.text.primary};
  border: ${props => props.active ? 'none' : `1px solid ${props.theme.divider}`};
  font-weight: ${props => props.active ? '600' : 'normal'};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.primary : props.theme.background};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CasesList = () => {
  // Mock data for cases
  const casesData = [
    {
      id: 'PI-2025-042',
      title: 'Johnson v. ABC Corporation',
      client: 'Sarah Johnson',
      stage: 'Negotiation',
      attorney: 'John Doe',
      status: 'Urgent',
      lastUpdated: 'Apr 16, 2025'
    },
    {
      id: 'PI-2025-041',
      title: 'Rodriguez v. XYZ Insurance',
      client: 'Maria Rodriguez',
      stage: 'Investigation',
      attorney: 'Jane Smith',
      status: 'Active',
      lastUpdated: 'Apr 15, 2025'
    },
    {
      id: 'PI-2025-040',
      title: 'Smith v. City Transit',
      client: 'Robert Smith',
      stage: 'Treatment',
      attorney: 'John Doe',
      status: 'Active',
      lastUpdated: 'Apr 14, 2025'
    },
    {
      id: 'PI-2025-039',
      title: 'Williams v. General Hospital',
      client: 'James Williams',
      stage: 'Litigation',
      attorney: 'Jane Smith',
      status: 'Pending',
      lastUpdated: 'Apr 13, 2025'
    },
    {
      id: 'PI-2025-038',
      title: 'Brown v. Retail Store Inc.',
      client: 'Michael Brown',
      stage: 'Settlement',
      attorney: 'John Doe',
      status: 'Active',
      lastUpdated: 'Apr 12, 2025'
    },
    {
      id: 'PI-2025-037',
      title: 'Davis v. Construction Co.',
      client: 'Emily Davis',
      stage: 'Intake',
      attorney: 'Jane Smith',
      status: 'Active',
      lastUpdated: 'Apr 11, 2025'
    },
    {
      id: 'PI-2025-036',
      title: 'Miller v. Restaurant Chain',
      client: 'David Miller',
      stage: 'Investigation',
      attorney: 'John Doe',
      status: 'Pending',
      lastUpdated: 'Apr 10, 2025'
    },
    {
      id: 'PI-2025-035',
      title: 'Wilson v. Trucking LLC',
      client: 'Jennifer Wilson',
      stage: 'Treatment',
      attorney: 'Jane Smith',
      status: 'Urgent',
      lastUpdated: 'Apr 09, 2025'
    }
  ];
  
  return (
    <CasesContainer>
      <PageHeader>
        <PageTitle>All Cases</PageTitle>
        <PageActions>
          <Button primary>
            <FiPlus /> New Case
          </Button>
        </PageActions>
      </PageHeader>
      
      <FilterContainer>
        <SearchBar>
          <SearchIcon>
            <FiSearch />
          </SearchIcon>
          <SearchInput placeholder="Search cases..." />
        </SearchBar>
        
        <FilterActions>
          <FilterButton>
            <FiFilter /> Filter
          </FilterButton>
          
          <SelectFilter>
            <SelectButton>
              All Stages <FiChevronDown />
            </SelectButton>
          </SelectFilter>
          
          <SelectFilter>
            <SelectButton>
              All Attorneys <FiChevronDown />
            </SelectButton>
          </SelectFilter>
        </FilterActions>
      </FilterContainer>
      
      <CasesTable>
        <TableHeader>
          <TableHeaderCell>Case</TableHeaderCell>
          <TableHeaderCell>Client</TableHeaderCell>
          <TableHeaderCell>Stage</TableHeaderCell>
          <TableHeaderCell>Attorney</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Last Updated</TableHeaderCell>
        </TableHeader>
        
        <TableBody>
          {casesData.map(caseItem => (
            <TableRow key={caseItem.id}>
              <TableCell>
                <CaseTitle>{caseItem.title}</CaseTitle>
                <CaseNumber>{caseItem.id}</CaseNumber>
              </TableCell>
              <TableCell label="Client:">{caseItem.client}</TableCell>
              <TableCell label="Stage:">{caseItem.stage}</TableCell>
              <TableCell label="Attorney:">{caseItem.attorney}</TableCell>
              <TableCell label="Status:">
                <CaseStatus status={caseItem.status}>{caseItem.status}</CaseStatus>
              </TableCell>
              <TableCell label="Last Updated:">{caseItem.lastUpdated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </CasesTable>
      
      <Pagination>
        <PaginationInfo>
          Showing 1-8 of 24 cases
        </PaginationInfo>
        
        <PaginationControls>
          <PaginationButton disabled>
            &lt;
          </PaginationButton>
          <PaginationButton active>
            1
          </PaginationButton>
          <PaginationButton>
            2
          </PaginationButton>
          <PaginationButton>
            3
          </PaginationButton>
          <PaginationButton>
            &gt;
          </PaginationButton>
        </PaginationControls>
      </Pagination>
    </CasesContainer>
  );
};

export default CasesList;
