import React, { useState } from 'react';
import { LayoutDashboard, Mail, FileText, Users, Menu } from 'lucide-react';
import EmailView from './components/EmailView';
import KnowledgeBase from './components/KnowledgeBase';
import CrmModule from './components/CrmModule';
import Dashboard from './components/Dashboard';
import { Email, EmailCategory, Client, DocumentFile } from './types';

// --- Mock Data Initialization ---

const MOCK_EMAILS: Email[] = [
  {
    id: '1',
    sender: 'boss@company.com',
    subject: 'Q3 Strategy Meeting',
    body: 'Hi, we need to discuss the Q3 roadmap. Are you free tomorrow at 10 AM?',
    date: '10:30 AM',
    category: EmailCategory.UNCLASSIFIED,
    actionRequired: false
  },
  {
    id: '2',
    sender: 'client@bigcorp.com',
    subject: 'Inquiry about Enterprise Plan',
    body: 'Hello, we are interested in your enterprise tier. Can you send a proposal?',
    date: '09:15 AM',
    category: EmailCategory.UNCLASSIFIED,
    actionRequired: false
  },
  {
    id: '3',
    sender: 'newsletter@techweekly.com',
    subject: 'Top 10 AI Tools of 2024',
    body: 'Check out the latest tools revolutionizing the industry...',
    date: 'Yesterday',
    category: EmailCategory.UNCLASSIFIED,
    actionRequired: false
  },
  {
    id: '4',
    sender: 'mom@gmail.com',
    subject: 'Sunday Lunch',
    body: 'Are you coming over this Sunday? Dad is making BBQ.',
    date: 'Yesterday',
    category: EmailCategory.UNCLASSIFIED,
    actionRequired: false
  }
];

const MOCK_CLIENTS: Client[] = [
  { id: '1', companyName: 'Acme Corp', contactPerson: 'John Doe', email: 'john@acme.com', status: 'Negotiation', lastContact: '2 days ago' },
  { id: '2', companyName: 'Globex Inc', contactPerson: 'Sarah Smith', email: 'sarah@globex.com', status: 'Lead', lastContact: '1 week ago' },
  { id: '3', companyName: 'Soylent Corp', contactPerson: 'James Green', email: 'j.green@soylent.com', status: 'Closed', lastContact: '1 month ago' },
];

const MOCK_DOCS: DocumentFile[] = [
  { id: '1', name: 'Q2_Sales_Report.pptx', type: 'pptx', source: 'Local', contentSnippet: 'Q2 Revenue was up 15%. Key growth in APAC region.', tags: ['sales', 'report'] },
  { id: '2', name: 'Product_Roadmap_2024.docx', type: 'docx', source: 'OneDrive', contentSnippet: 'Launch of AI features scheduled for Q3. Mobile app redesign in Q4.', tags: ['product', 'roadmap'] },
  { id: '3', name: 'Pricing_Tier_Structure.pdf', type: 'pdf', source: 'Local', contentSnippet: 'Enterprise tier starts at $50k/year. Includes 24/7 support.', tags: ['pricing', 'internal'] },
];

// --- Main App ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'email' | 'knowledge' | 'crm'>('dashboard');
  const [emails, setEmails] = useState<Email[]>(MOCK_EMAILS);
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [documents, setDocuments] = useState<DocumentFile[]>(MOCK_DOCS);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Connection States
  const [isGmailConnected, setIsGmailConnected] = useState(false);
  const [isDriveConnected, setIsDriveConnected] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            emails={emails} 
            clients={clients} 
            navigateTo={(tab) => setActiveTab(tab)} 
            gmailConnected={isGmailConnected}
          />
        );
      case 'email':
        return (
          <EmailView 
            emails={emails} 
            setEmails={setEmails} 
            isConnected={isGmailConnected}
            onConnect={() => setIsGmailConnected(true)}
          />
        );
      case 'knowledge':
        return (
          <KnowledgeBase 
            documents={documents} 
            setDocuments={setDocuments} 
            isDriveConnected={isDriveConnected}
            onConnectDrive={() => setIsDriveConnected(true)}
          />
        );
      case 'crm':
        return <CrmModule clients={clients} setClients={setClients} />;
      default:
        return (
          <Dashboard 
            emails={emails} 
            clients={clients} 
            navigateTo={(tab) => setActiveTab(tab)} 
            gmailConnected={isGmailConnected}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-slate-300 transition-all duration-300 flex flex-col shadow-xl z-20`}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-800">
          {sidebarOpen && <span className="font-bold text-white text-lg tracking-tight">OmniTask AI</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-slate-800 rounded">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem 
            icon={<LayoutDashboard />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
            expanded={sidebarOpen}
          />
          <SidebarItem 
            icon={<Mail />} 
            label="Email Agent" 
            active={activeTab === 'email'} 
            onClick={() => setActiveTab('email')} 
            expanded={sidebarOpen}
          />
          <SidebarItem 
            icon={<FileText />} 
            label="Knowledge Base" 
            active={activeTab === 'knowledge'} 
            onClick={() => setActiveTab('knowledge')} 
            expanded={sidebarOpen}
          />
          <SidebarItem 
            icon={<Users />} 
            label="CRM & Sales" 
            active={activeTab === 'crm'} 
            onClick={() => setActiveTab('crm')} 
            expanded={sidebarOpen}
          />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
              JD
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm text-white font-medium truncate">John Doe</p>
                <p className="text-xs text-slate-500 truncate">john@example.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between">
          <h1 className="text-xl font-semibold text-slate-800 capitalize">
            {activeTab === 'dashboard' ? 'Command Center' :
             activeTab === 'email' ? 'Inbox Management' : 
             activeTab === 'knowledge' ? 'Document Intelligence' : 
             'Customer Relations'}
          </h1>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              AI Online
            </span>
          </div>
        </header>
        
        <div className="flex-1 p-6 overflow-hidden">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  expanded: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick, expanded }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
        active 
          ? 'bg-primary text-white shadow-lg shadow-blue-900/20' 
          : 'hover:bg-slate-800 hover:text-white'
      }`}
    >
      <span className="w-5 h-5">{icon}</span>
      {expanded && <span className="font-medium text-sm whitespace-nowrap">{label}</span>}
    </button>
  );
};

export default App;
