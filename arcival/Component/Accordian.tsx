/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableRow, TableCell, TableBody, Tab, TabList } from '@fluentui/react-components';
import { makeStyles } from '@fluentui/react-components';

interface Account {
  account_id: string;
  name: string;
  industry: string;
  location: string;
  contacts?: Array<Contact>;
  cases?: Array<Case>;
  [key: string]: any;
}

interface Contact {
  contact_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface Case {
  case_id: string;
  title: string;
  description: string;
  status: string;
}

interface FluentAccordionProps {
  accounts: Account[];
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  sidebar: {
    width: '20%',
    borderRight: '1px solid #ddd',
    padding: '10px',
  },
  content: {
    width: '80%',
    padding: '10px',
  },
  tabList: {
    gap: '16px',
  },
  tab: {
    fontSize: '16px',
    padding: '12px 16px',
  },
});

const FluentAccordion: React.FC<FluentAccordionProps> = ({ accounts }) => {
  const [activeParentIndex, setActiveParentIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<{ [key: number]: string }>({});
  const styles = useStyles();

  useEffect(() => {
    if (accounts.length > 0) {
      const firstKey = Object.keys(accounts[0]).find(
        (key) => Array.isArray(accounts[0][key]) && accounts[0][key].length > 0
      );
      if (firstKey) {
        setActiveTab({ 0: firstKey });
      }
    }
  }, [accounts]);

  const selectTab = (parentIndex: number, tabKey: string) => {
    setActiveTab({ [parentIndex]: tabKey });
  };

  const renderArrayAsTab = (array: any[], parentIndex: number, tabKey: string) => {
    if (Array.isArray(array) && array.length > 0 && typeof array[0] === 'object') {
      return (
        <Tab
          key={tabKey}
          value={tabKey}
          className={styles.tab}
          // appearance={activeTab[parentIndex] === tabKey ? 'primary' : 'transparent'}
          onClick={() => selectTab(parentIndex, tabKey)}
        >
          {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
        </Tab>
      );
    }
    return null;
  };

  const renderObjectContent = (data: any) => {
    if (typeof data === 'object' && !Array.isArray(data)) {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(data).map((key) => (
                <TableCell key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {Object.keys(data).map((key) => (
                <TableCell key={key}>
                  {typeof data[key] === 'object' ? renderObjectContent(data[key]) : data[key]}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      );
    }
    return data;
  };

  const renderActiveTabContent = (data: any[]) => {
    if (Array.isArray(data) && data.length > 0) {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(data[0]).map((field) => (
                <TableCell key={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, idx) => (
              <TableRow key={idx}>
                {Object.keys(item).map((field) => (
                  <TableCell key={field}>
                    {Array.isArray(item[field])
                      ? renderArrayAsTab(item[field], idx, `${field}-${idx}`)
                      : typeof item[field] === 'object' && item[field] !== null
                      ? renderObjectContent(item[field])
                      : item[field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
    return null;
  };

  return (
    <div className={styles.container}>
      {/* Sidebar with vertical navigation tabs */}
      <div className={styles.sidebar}>
        <TabList vertical className={styles.tabList}>
          {accounts.map((account, parentIndex) => (
            <Tab
              key={account.account_id}
              value={parentIndex}
              className={styles.tab}
              onClick={() => setActiveParentIndex(parentIndex)}
              // appearance={activeParentIndex === parentIndex ? 'primary' : 'transparent'}
            >
              {`${account.name} (${account.industry}, ${account.location})`}
            </Tab>
          ))}
        </TabList>
      </div>

      {/* Content Area */}
      <div className={styles.content}>
        {accounts[activeParentIndex] && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(accounts[activeParentIndex])
                    .filter((key) => !Array.isArray(accounts[activeParentIndex][key]))
                    .map((field) => (
                      <TableCell key={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</TableCell>
                    ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  {Object.keys(accounts[activeParentIndex])
                    .filter((key) => !Array.isArray(accounts[activeParentIndex][key]))
                    .map((field) => (
                      <TableCell key={field}>{accounts[activeParentIndex][field]}</TableCell>
                    ))}
                </TableRow>
              </TableBody>
            </Table>
            <div>
              <TabList>
                {Object.keys(accounts[activeParentIndex]).map((key) =>
                  Array.isArray(accounts[activeParentIndex][key]) &&
                  accounts[activeParentIndex][key].length > 0 &&
                  typeof accounts[activeParentIndex][key][0] === 'object' ? (
                    renderArrayAsTab(accounts[activeParentIndex][key], activeParentIndex, key)
                  ) : null
                )}
              </TabList>
            </div>
            {Object.keys(accounts[activeParentIndex]).map((key) =>
              activeTab[activeParentIndex] === key
                ? renderActiveTabContent(accounts[activeParentIndex][key])
                : null
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FluentAccordion;
