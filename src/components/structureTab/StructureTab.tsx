import SchemaTree from "./SchemaTree";

const DatabaseStructureTab = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <SchemaTree />
        </div>
      </div>
    </div>
  );
};

export default DatabaseStructureTab;
