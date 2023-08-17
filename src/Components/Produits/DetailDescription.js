import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function DetailDescription() {

  return (
        
        <Tabs id="controlled-tab-example" activeKey= 'avis' className="mt-4">
            <Tab eventKey="avis" title="Commentaire">
                Avis des utilisateurs
            </Tab>
        </Tabs>
  );
}