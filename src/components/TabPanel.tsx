import React, { useState, ReactNode } from "react";

interface TabProps {
  title: string;
  content: ReactNode;
}

interface TabPanelProps {
  tabs: TabProps[];
  activeTabStyle?: string;
  inactiveTabStyle?: string;
}

const TabPanel: React.FC<TabPanelProps> = ({
  tabs,
  activeTabStyle = "border-b-2 border-red-600",
  inactiveTabStyle = "",
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onSelect={(e) => e.preventDefault()}
            className={`py-2 px-4 cursor-pointer ${
              activeTab === index ? activeTabStyle : inactiveTabStyle
            }`}
            onClick={() => setActiveTab(index)}>
            {tab.title}
          </div>
        ))}
      </div>
      <div>{tabs[activeTab].content}</div>
    </div>
  );
};

export default TabPanel;
