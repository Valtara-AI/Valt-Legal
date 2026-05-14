import React, { useState } from 'react';
import styled from 'styled-components';
import { FiPlus, FiUpload, FiDownload, FiTrash2, FiSearch, FiFolder, FiFile, FiFileText } from 'react-icons/fi';

const DocumentsContainer = styled.div``;

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

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  box-shadow: 0 2px 4px ${props => props.theme.shadow};
  padding: 1.5rem;
  
  @media (max-width: 992px) {
    display: none;
  }
`;

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.text.primary};
`;

const FolderList = styled.div``;

const FolderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  color: ${props => props.active ? props.theme.primary : props.theme.text.primary};
  font-weight: ${props => props.active ? '500' : 'normal'};
  cursor: pointer;
  
  svg {
    margin-right: 0.75rem;
  }
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const MainContent = styled.div``;

const SearchBar = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
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

const DocumentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const DocumentCard = styled.div`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  box-shadow: 0 2px 4px ${props => props.theme.shadow};
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px ${props => props.theme.shadow};
  }
`;

const DocumentIcon = styled.div`
  font-size: 2.5rem;
  color: ${props => {
    switch(props.type) {
      case 'pdf':
        return '#f44336';
      case 'doc':
        return '#2196f3';
      case 'image':
        return '#4caf50';
      default:
        return props.theme.text.secondary;
    }
  }};
  margin-bottom: 1rem;
  text-align: center;
`;

const DocumentTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text.primary};
  word-break: break-word;
`;

const DocumentMeta = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.text.secondary};
`;

const DocumentActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  background: none;
  color: ${props => props.theme.text.secondary};
  font-size: 1rem;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme.text.secondary};
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const EmptyStateTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text.primary};
`;

const EmptyStateText = styled.div`
  margin-bottom: 1.5rem;
`;

const DocumentManagement = () => {
  const [activeFolder, setActiveFolder] = useState('all');
  
  // Mock data for documents
  const documentsData = [
    {
      id: 'doc-001',
      title: 'Johnson Case - Medical Records.pdf',
      type: 'pdf',
      size: '2.4 MB',
      lastModified: 'Apr 15, 2025',
      folder: 'medical'
    },
    {
      id: 'doc-002',
      title: 'Rodriguez Case - Police Report.pdf',
      type: 'pdf',
      size: '1.8 MB',
      lastModified: 'Apr 14, 2025',
      folder: 'evidence'
    },
    {
      id: 'doc-003',
      title: 'Smith Case - Witness Statement.doc',
      type: 'doc',
      size: '350 KB',
      lastModified: 'Apr 13, 2025',
      folder: 'evidence'
    },
    {
      id: 'doc-004',
      title: 'Williams Case - Settlement Agreement.doc',
      type: 'doc',
      size: '420 KB',
      lastModified: 'Apr 12, 2025',
      folder: 'legal'
    },
    {
      id: 'doc-005',
      title: 'Johnson Case - Accident Scene Photos.jpg',
      type: 'image',
      size: '3.2 MB',
      lastModified: 'Apr 11, 2025',
      folder: 'evidence'
    },
    {
      id: 'doc-006',
      title: 'Rodriguez Case - Medical Bills.pdf',
      type: 'pdf',
      size: '1.5 MB',
      lastModified: 'Apr 10, 2025',
      folder: 'medical'
    },
    {
      id: 'doc-007',
      title: 'Client Intake Form Template.doc',
      type: 'doc',
      size: '280 KB',
      lastModified: 'Apr 09, 2025',
      folder: 'templates'
    },
    {
      id: 'doc-008',
      title: 'Demand Letter Template.doc',
      type: 'doc',
      size: '320 KB',
      lastModified: 'Apr 08, 2025',
      folder: 'templates'
    }
  ];
  
  // Filter documents based on active folder
  const filteredDocuments = activeFolder === 'all' 
    ? documentsData 
    : documentsData.filter(doc => doc.folder === activeFolder);
  
  return (
    <DocumentsContainer>
      <PageHeader>
        <PageTitle>Document Management</PageTitle>
        <PageActions>
          <Button>
            <FiUpload /> Upload
          </Button>
          <Button primary>
            <FiPlus /> New Document
          </Button>
        </PageActions>
      </PageHeader>
      
      <ContentContainer>
        <Sidebar>
          <SidebarTitle>Folders</SidebarTitle>
          <FolderList>
            <FolderItem 
              active={activeFolder === 'all'} 
              onClick={() => setActiveFolder('all')}
            >
              <FiFolder /> All Documents
            </FolderItem>
            <FolderItem 
              active={activeFolder === 'medical'} 
              onClick={() => setActiveFolder('medical')}
            >
              <FiFolder /> Medical Records
            </FolderItem>
            <FolderItem 
              active={activeFolder === 'evidence'} 
              onClick={() => setActiveFolder('evidence')}
            >
              <FiFolder /> Evidence
            </FolderItem>
            <FolderItem 
              active={activeFolder === 'legal'} 
              onClick={() => setActiveFolder('legal')}
            >
              <FiFolder /> Legal Documents
            </FolderItem>
            <FolderItem 
              active={activeFolder === 'templates'} 
              onClick={() => setActiveFolder('templates')}
            >
              <FiFolder /> Templates
            </FolderItem>
            <FolderItem 
              active={activeFolder === 'client'} 
              onClick={() => setActiveFolder('client')}
            >
              <FiFolder /> Client Documents
            </FolderItem>
          </FolderList>
        </Sidebar>
        
        <MainContent>
          <SearchBar>
            <SearchIcon>
              <FiSearch />
            </SearchIcon>
            <SearchInput placeholder="Search documents..." />
          </SearchBar>
          
          {filteredDocuments.length > 0 ? (
            <DocumentsGrid>
              {filteredDocuments.map(doc => (
                <DocumentCard key={doc.id}>
                  <DocumentIcon type={doc.type}>
                    {doc.type === 'pdf' ? <FiFileText /> : 
                     doc.type === 'doc' ? <FiFile /> : 
                     <FiFile />}
                  </DocumentIcon>
                  <DocumentTitle>{doc.title}</DocumentTitle>
                  <DocumentMeta>
                    {doc.size} • {doc.lastModified}
                  </DocumentMeta>
                  <DocumentActions>
                    <ActionButton title="Download">
                      <FiDownload />
                    </ActionButton>
                    <ActionButton title="Delete">
                      <FiTrash2 />
                    </ActionButton>
                  </DocumentActions>
                </DocumentCard>
              ))}
            </DocumentsGrid>
          ) : (
            <EmptyState>
              <EmptyStateIcon>
                <FiFile />
              </EmptyStateIcon>
              <EmptyStateTitle>No documents found</EmptyStateTitle>
              <EmptyStateText>
                This folder is empty. Upload documents or create a new one.
              </EmptyStateText>
              <Button primary>
                <FiUpload /> Upload Documents
              </Button>
            </EmptyState>
          )}
        </MainContent>
      </ContentContainer>
    </DocumentsContainer>
  );
};

export default DocumentManagement;
