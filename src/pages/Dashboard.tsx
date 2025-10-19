import { DollarSign, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { Navigation } from "@/components/Navigation";
import { useTransactions } from "@/hooks/useTransactions";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TransactionForm } from "@/components/TransactionForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Dashboard = () => {
  const { balance, totalIncome, totalExpenses, transactions, loading } = useTransactions();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const recentTransactions = transactions.slice(0, 5);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Financial Overview</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Transaction
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Transaction</DialogTitle>
                  </DialogHeader>
                  <TransactionForm onSuccess={() => setIsDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatsCard
                    title="Total Balance"
                    amount={balance}
                    icon={DollarSign}
                    trend={12.5}
                    type="balance"
                  />
                  <StatsCard
                    title="Total Income"
                    amount={totalIncome}
                    icon={TrendingUp}
                    trend={8.2}
                    type="income"
                  />
                  <StatsCard
                    title="Total Expenses"
                    amount={totalExpenses}
                    icon={TrendingDown}
                    trend={-3.1}
                    type="expense"
                  />
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recentTransactions.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        No transactions yet. Add your first transaction to get started!
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {recentTransactions.map((transaction) => (
                          <div
                            key={transaction.id}
                            className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                          >
                            <div>
                              <p className="font-medium">{transaction.category}</p>
                              <p className="text-sm text-muted-foreground">
                                {transaction.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <p
                                className={`font-semibold ${
                                  transaction.type === "income"
                                    ? "text-success"
                                    : "text-destructive"
                                }`}
                              >
                                {transaction.type === "income" ? "+" : "-"}$
                                {transaction.amount.toFixed(2)}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(transaction.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
