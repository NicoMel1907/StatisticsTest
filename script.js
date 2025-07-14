let currentStep = 'q1';
        let history = [];
        let breadcrumbPath = [];

        const results = {
            'qualitative-exploration': {
                title: '📝 Qualitative Analysis',
                description: 'Explore themes and patterns in your text data',
                details: {
                    'Recommended Approaches': [
                        'Word cloud analysis for common terms',
                        'Thematic analysis for identifying patterns',
                        'Content analysis for systematic categorization',
                        'Use AI tools like ChatGPT for theme identification (only if data is not sensitive)'
                    ],
                    'Next Steps': [
                        'Consider converting themes to categories for quantitative analysis',
                        'Use qualitative analysis software like NVivo or Atlas.ti',
                        'Ensure inter-rater reliability if multiple coders'
                    ]
                }
            },
            'categorical-descriptive': {
                title: '📊 Categorical Descriptive Analysis',
                description: 'Summarize your categorical data with frequencies and percentages',
                details: {
                    'Recommended Statistics': [
                        'Frequency tables and percentages',
                        'Cross-tabulations for multiple variables',
                        'Bar charts and pie charts for visualization',
                        'Mode (most frequent category)'
                    ],
                    'Tools': [
                        'Excel pivot tables',
                        'SPSS frequency analysis',
                        'R: table() and prop.table() functions'
                    ]
                }
            },
            'ordinal-descriptive': {
                title: '📈 Ordinal Descriptive Analysis',
                description: 'Summarize your ranked/ordered data',
                details: {
                    'Recommended Statistics': [
                        'Median (middle value)',
                        'Percentiles and quartiles',
                        'Frequency distributions',
                        'Box plots for visualization'
                    ],
                    'Avoid': [
                        'Mean (not appropriate for ordinal data)',
                        'Standard deviation (use with caution)'
                    ]
                }
            },
            'continuous-descriptive': {
                title: '📊 Continuous Descriptive Analysis',
                description: 'Comprehensive summary of your numerical data',
                details: {
                    'Essential Statistics': [
                        'Mean and standard deviation',
                        'Median and interquartile range',
                        'Minimum, maximum, and range',
                        'Skewness and kurtosis'
                    ],
                    'Visualizations': [
                        'Histograms to check distribution shape',
                        'Box plots to identify outliers',
                        'Q-Q plots to assess normality'
                    ]
                }
            },
            'chi-square-goodness': {
                title: '🎯 Chi-Square Goodness of Fit',
                description: 'Test if your sample matches expected proportions',
                details: {
                    'When to Use': [
                        'One categorical variable',
                        'Want to test against expected distribution',
                        'Example: Are website visitors equally distributed across days?'
                    ],
                    'Assumptions': [
                        'Expected frequency ≥ 5 in each category',
                        'Independent observations',
                        'Random sampling'
                    ],
                    'Alternative': [
                        'Exact binomial test for small samples'
                    ]
                }
            },
            'chi-square-independence': {
                title: '🔗 Chi-Square Test of Independence',
                description: 'Test if two categorical variables are related',
                details: {
                    'When to Use': [
                        'Two categorical variables',
                        'Want to test if variables are independent',
                        'Example: Is gender related to product preference?'
                    ],
                    'Assumptions': [
                        'Expected frequency ≥ 5 in each cell',
                        'Independent observations',
                        'Random sampling'
                    ],
                    'Alternatives': [
                        'Fisher\'s Exact Test for small samples',
                        'Cramer\'s V for effect size'
                    ]
                }
            },
            'mann-whitney': {
                title: '👥 Mann-Whitney U Test',
                description: 'Compare ordinal data between two independent groups',
                details: {
                    'When to Use': [
                        'Two independent groups',
                        'Ordinal data or non-normal continuous data',
                        'Example: Compare satisfaction ratings between departments'
                    ],
                    'Assumptions': [
                        'Independent observations',
                        'Ordinal or continuous data',
                        'Similar distribution shapes'
                    ],
                    'Effect Size': [
                        'Rank-biserial correlation',
                        'Probability of superiority'
                    ]
                }
            },
            'kruskal-wallis': {
                title: '🎯 Kruskal-Wallis Test',
                description: 'Compare ordinal data across multiple independent groups',
                details: {
                    'When to Use': [
                        'Three or more independent groups',
                        'Ordinal data or non-normal continuous data',
                        'Example: Compare rankings across multiple conditions'
                    ],
                    'Assumptions': [
                        'Independent observations',
                        'Ordinal or continuous data',
                        'Similar distribution shapes'
                    ],
                    'Post-hoc Tests': [
                        'Dunn\'s test for pairwise comparisons',
                        'Adjust p-values for multiple comparisons'
                    ]
                }
            },
            'wilcoxon-signed-rank': {
                title: '🔄 Wilcoxon Signed-Rank Test',
                description: 'Compare paired ordinal data (before/after)',
                details: {
                    'When to Use': [
                        'Two related measurements',
                        'Ordinal data or non-normal continuous data',
                        'Example: Before/after treatment satisfaction'
                    ],
                    'Assumptions': [
                        'Paired observations',
                        'Ordinal or continuous data',
                        'Symmetric distribution of differences'
                    ],
                    'Effect Size': [
                        'Rank-biserial correlation',
                        'Wilcoxon r'
                    ]
                }
            },
            'friedman': {
                title: '📊 Friedman Test',
                description: 'Compare ordinal data across multiple time points',
                details: {
                    'When to Use': [
                        'Three or more related measurements',
                        'Ordinal data or non-normal continuous data',
                        'Example: Compare satisfaction across multiple time points'
                    ],
                    'Assumptions': [
                        'Related observations (same participants)',
                        'Ordinal or continuous data',
                        'Similar distribution shapes'
                    ],
                    'Post-hoc Tests': [
                        'Wilcoxon signed-rank tests with Bonferroni correction',
                        'Conover\'s test for pairwise comparisons'
                    ]
                }
            },
            'independent-t-test': {
                title: '👥 Independent Samples t-Test',
                description: 'Compare means between two independent groups',
                details: {
                    'When to Use': [
                        'Two independent groups',
                        'Continuous data',
                        'Example: Compare test scores between two classes'
                    ],
                    'Assumptions': [
                        'Normal distribution in both groups',
                        'Independent observations',
                        'Equal variances (use Welch\'s t-test if unequal)'
                    ],
                    'Check First': [
                        'Shapiro-Wilk test for normality',
                        'Levene\'s test for equal variances',
                        'If assumptions violated, use Mann-Whitney U test'
                    ],
                    'Effect Size': [
                        'Cohen\'s d',
                        'Glass\'s delta'
                    ]
                }
            },
            'one-way-anova': {
                title: '🎯 One-Way ANOVA',
                description: 'Compare means across multiple independent groups',
                details: {
                    'When to Use': [
                        'Three or more independent groups',
                        'Continuous data',
                        'Example: Compare performance across departments'
                    ],
                    'Assumptions': [
                        'Normal distribution in all groups',
                        'Independent observations',
                        'Equal variances (homoscedasticity)'
                    ],
                    'Check First': [
                        'Shapiro-Wilk test for normality',
                        'Levene\'s test for equal variances',
                        'If assumptions violated, use Kruskal-Wallis test'
                    ],
                    'Post-hoc Tests': [
                        'Tukey\'s HSD for equal variances',
                        'Games-Howell for unequal variances',
                        'Bonferroni correction for multiple comparisons'
                    ],
                    'Effect Size': [
                        'Eta-squared (η²)',
                        'Omega-squared (ω²)'
                    ]
                }
            },
            'paired-t-test': {
                title: '🔄 Paired Samples t-Test',
                description: 'Compare means before/after or between related conditions',
                details: {
                    'When to Use': [
                        'Two related measurements',
                        'Continuous data',
                        'Example: Before/after training scores'
                    ],
                    'Assumptions': [
                        'Normal distribution of differences',
                        'Paired observations',
                        'Interval or ratio data'
                    ],
                    'Check First': [
                        'Test normality of difference scores',
                        'If assumption violated, use Wilcoxon signed-rank test'
                    ],
                    'Effect Size': [
                        'Cohen\'s d (for paired samples)',
                        'Correlation coefficient'
                    ]
                }
            },
            'repeated-measures-anova': {
                title: '📊 Repeated Measures ANOVA',
                description: 'Compare means across multiple time points or conditions',
                details: {
                    'When to Use': [
                        'Three or more related measurements',
                        'Continuous data',
                        'Example: Compare scores across multiple time points'
                    ],
                    'Assumptions': [
                        'Normal distribution',
                        'Sphericity (equal variances of differences)',
                        'No missing data'
                    ],
                    'Check First': [
                        'Mauchly\'s test for sphericity',
                        'If violated, use Greenhouse-Geisser correction',
                        'If assumptions violated, use Friedman test'
                    ],
                    'Post-hoc Tests': [
                        'Bonferroni correction for pairwise comparisons',
                        'Polynomial contrasts for trends'
                    ],
                    'Effect Size': [
                        'Partial eta-squared (ηp²)',
                        'Generalized eta-squared'
                    ]
                }
            },
            'spearman-correlation': {
                title: '📈 Spearman Rank Correlation',
                description: 'Measure monotonic relationship between ordinal variables',
                details: {
                    'When to Use': [
                        'Two ordinal variables',
                        'Non-linear monotonic relationships',
                        'Example: Rank correlation between job satisfaction and performance'
                    ],
                    'Assumptions': [
                        'Ordinal or continuous data',
                        'Monotonic relationship',
                        'Independent observations'
                    ],
                    'Interpretation': [
                        'ρ = 0: No monotonic relationship',
                        'ρ = ±1: Perfect monotonic relationship',
                        'Similar to Pearson but for ranks'
                    ],
                    'Advantages': [
                        'Robust to outliers',
                        'No normality assumption',
                        'Detects non-linear monotonic relationships'
                    ]
                }
            },
            'pearson-correlation': {
                title: '📊 Pearson Correlation',
                description: 'Measure linear relationship between continuous variables',
                details: {
                    'When to Use': [
                        'Two continuous variables',
                        'Linear relationship',
                        'Example: Correlation between study time and test scores'
                    ],
                    'Assumptions': [
                        'Normal distribution of both variables',
                        'Linear relationship',
                        'Independent observations',
                        'No extreme outliers'
                    ],
                    'Check First': [
                        'Scatterplot to assess linearity',
                        'Test for normality',
                        'If assumptions violated, use Spearman correlation'
                    ],
                    'Interpretation': [
                        'r = 0: No linear relationship',
                        'r = ±1: Perfect linear relationship',
                        '|r| > 0.7: Strong relationship'
                    ],
                    'Effect Size': [
                        'r² = coefficient of determination',
                        'Shows proportion of variance explained'
                    ]
                }
            },
            'linear-regression': {
                title: '📉 Linear Regression',
                description: 'Predict one variable from another',
                details: {
                    'When to Use': [
                        'One continuous predictor, one continuous outcome',
                        'Want to predict or explain relationships',
                        'Example: Predict sales from advertising spend'
                    ],
                    'Assumptions': [
                        'Linear relationship',
                        'Independence of residuals',
                        'Homoscedasticity (equal variance of residuals)',
                        'Normal distribution of residuals'
                    ],
                    'Check First': [
                        'Residual plots for assumptions',
                        'Durbin-Watson test for independence',
                        'Cook\'s distance for influential points'
                    ],
                    'Extensions': [
                        'Multiple regression for multiple predictors',
                        'Polynomial regression for non-linear relationships',
                        'Logistic regression for binary outcomes'
                    ],
                    'Model Evaluation': [
                        'R² (coefficient of determination)',
                        'Adjusted R² (penalizes complexity)',
                        'RMSE (root mean square error)'
                    ]
                }
            }
        };

        function updateProgress() {
            const totalSteps = 8; // Approximate total steps
            const currentStepNumber = history.length + 1;
            const progressPercent = (currentStepNumber / totalSteps) * 100;
            document.getElementById('progressFill').style.width = progressPercent + '%';
        }

        function updateBreadcrumb() {
            const breadcrumb = document.getElementById('breadcrumb');
            breadcrumb.innerHTML = '';
            
            breadcrumbPath.forEach((item, index) => {
                const breadcrumbItem = document.createElement('div');
                breadcrumbItem.className = 'breadcrumb-item';
                if (index === breadcrumbPath.length - 1) {
                    breadcrumbItem.classList.add('active');
                }
                breadcrumbItem.textContent = item;
                breadcrumb.appendChild(breadcrumbItem);
            });
        }

        function navigate(targetStep) {
            history.push(currentStep);
            
            // Update breadcrumb path
            const stepDescriptions = {
                'q1': 'Data Type',
                'q2-quantitative': 'Quantitative',
                'q2-qualitative': 'Qualitative',
                'q3-categorical': 'Categorical',
                'q3-ordinal': 'Ordinal',
                'q3-continuous': 'Continuous',
                'q4-categorical-groups': 'Compare Groups',
                'q4-ordinal-groups': 'Compare Groups',
                'q4-continuous-groups': 'Compare Groups',
                'q4-categorical-relationship': 'Relationships',
                'q4-ordinal-relationship': 'Relationships',
                'q4-continuous-relationship': 'Relationships',
                'q5-ordinal-independent': 'Independent',
                'q5-ordinal-repeated': 'Repeated',
                'q5-continuous-independent': 'Independent',
                'q5-continuous-repeated': 'Repeated'
            };
            
            if (stepDescriptions[targetStep]) {
                breadcrumbPath.push(stepDescriptions[targetStep]);
            }
            
            // Hide current step
            document.getElementById(currentStep).classList.remove('active');
            
            // Show target step
            currentStep = targetStep;
            const targetElement = document.getElementById(targetStep);
            if (targetElement) {
                setTimeout(() => {
                    targetElement.classList.add('active');
                }, 100);
            }
            
            updateProgress();
            updateBreadcrumb();
        }

        function showResult(resultKey) {
            history.push(currentStep);
            
            // Hide current step
            document.getElementById(currentStep).classList.remove('active');
            
            // Show result
            const resultContainer = document.getElementById('result');
            const result = results[resultKey];
            
            let detailsHTML = '';
            for (const [category, items] of Object.entries(result.details)) {
                detailsHTML += `
                    <div class="result-details">
                        <h3>${category}:</h3>
                        <ul>
                            ${items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
            
            resultContainer.innerHTML = `
                <div class="result-title">${result.title}</div>
                <div class="result-description">${result.description}</div>
                ${detailsHTML}
                <div style="margin-top: 20px;">
                    <button class="nav-button" onclick="restart()" style="margin-right: 10px;">🔄 Try Another Analysis</button>
                </div>
            `;
            
            resultContainer.classList.add('active');
            
            // Update breadcrumb
            breadcrumbPath.push('Result');
            updateBreadcrumb();
            updateProgress();
        }

        function goBack() {
            if (history.length > 0) {
                // Hide current step or result
                const currentElement = document.getElementById(currentStep) || document.getElementById('result');
                if (currentElement) {
                    currentElement.classList.remove('active');
                }
                
                // Hide result if it's active
                const resultContainer = document.getElementById('result');
                if (resultContainer.classList.contains('active')) {
                    resultContainer.classList.remove('active');
                }
                
                // Go back to previous step
                currentStep = history.pop();
                breadcrumbPath.pop();
                
                setTimeout(() => {
                    document.getElementById(currentStep).classList.add('active');
                }, 100);
                
                updateProgress();
                updateBreadcrumb();
            }
        }

        function restart() {
            // Hide all elements
            document.querySelectorAll('.question-container, .result-container').forEach(el => {
                el.classList.remove('active');
            });
            
            // Reset to first question
            currentStep = 'q1';
            history = [];
            breadcrumbPath = ['Start'];
            
            setTimeout(() => {
                document.getElementById('q1').classList.add('active');
            }, 100);
            
            updateProgress();
            updateBreadcrumb();
        }

        function exportSummary(resultKey) {
            const result = results[resultKey];
            let summary = `Statistical Analysis Recommendation\n`;
            summary += `=========================================\n\n`;
            summary += `Recommended Test: ${result.title}\n`;
            summary += `Description: ${result.description}\n\n`;
            
            for (const [category, items] of Object.entries(result.details)) {
                summary += `${category}:\n`;
                items.forEach(item => {
                    summary += `• ${item}\n`;
                });
                summary += '\n';
            }
            
            summary += `Generated by Statistical Decision Tree\n`;
            summary += `Date: ${new Date().toLocaleDateString()}\n`;
            
            // Create download
            const blob = new Blob([summary], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'statistical_analysis_recommendation.txt';
            a.click();
            URL.revokeObjectURL(url);
        }
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            breadcrumbPath = ['Start'];
            updateBreadcrumb();
            updateProgress();
        });